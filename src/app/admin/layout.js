import Sidebar from "@/components/admin/components/sidebar/Sidebar";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Panel de Admin | Luxoria",
  description: "Panel de administración de Luxoria ",
};

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <div className="min-h-svh w-full overflow-hidden bg-gray-100">
        <Sidebar />
        <main className="h-full overflow-y-auto bg-gray-100 pr-[16px]">
          {children}
        </main>
      </div>
    </AppProvider>
  );
}
