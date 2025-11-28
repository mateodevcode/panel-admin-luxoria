// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import Usuario from "@/models/usuario";
import { connectMongoDB } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        await connectMongoDB();
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
          throw new Error("Correo no registrado");
        }

        if (usuario.bloqueado) {
          throw new Error("Cuenta bloqueada");
        }

        const verificarPassword = await bcrypt.compare(
          password,
          usuario.password
        );
        if (!verificarPassword) {
          usuario.intentosFallidos += 1;

          if (usuario.intentosFallidos >= 3) {
            usuario.bloqueado = true;
            await usuario.save();
            throw new Error("Usuario bloqueado");
          }

          await usuario.save();
          throw new Error("Contraseña incorrecta");
        }

        // Reiniciar intentos fallidos
        usuario.intentosFallidos = 0;
        await usuario.save();

        return {
          id: usuario._id.toString(),
          name: usuario.name,
          email: usuario.email,
          image: usuario.imageUrl,
          role: usuario.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectMongoDB();

      let usuarioExistente = await Usuario.findOne({ email: user.email });

      if (!usuarioExistente) {
        usuarioExistente = await Usuario.create({
          name: user.name,
          email: user.email,
          imageUrl: user.image,
          provider: account.provider,
          role: "Usuario",
        });
      }

      // Inyecta cargo e ID en user para que se pase al token
      user.id = usuarioExistente._id.toString();
      user.role = usuarioExistente.role;

      return true;
    },

    async jwt({ token, user }) {
      await connectMongoDB();

      if (user) {
        token.id = user.id;
        token.role = user.role;
        // } else {
        //   // 🔄 Si ya tiene sesión, verificamos el rol actualizado en la base de datos
        //   const usuarioActual = await Usuario.findById(token.id);
        //   if (usuarioActual) {
        //     token.role = usuarioActual.role || token.role;
        //   }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // Pasa el cargo a useSession
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/", // Página de inicio de sesión
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
