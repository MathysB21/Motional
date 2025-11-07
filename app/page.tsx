import Image from "next/image";
import gsapLogo from "@/assets/logos/gsap.svg";
import motionLogo from "@/assets/logos/motion.svg";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-20 bg-zinc-200 font-sans">
      <a href="/motion">
        <div className="home-page-card hover:bg-yellow-300">
          <Image src={motionLogo} width={100} height={100} alt="Motion Logo" />
        </div>
      </a>
      <a href="/gsap">
        <div className="home-page-card hover:bg-green-500">
          <Image src={gsapLogo} width={100} height={100} alt="GSAP Logo" />
        </div>
      </a>
    </div>
  );
}
