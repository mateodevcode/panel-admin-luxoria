import Image from "next/image";
import Link from "next/link";
import { logo } from "@/data/logo";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center select-none font-poppins gap-2 w-full justify-center"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={1000}
        height={1000}
        className="w-40 h-auto"
      />
    </Link>
  );
};

export default Logo;
