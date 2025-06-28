"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import BackgroundVideo from "../components/BackgroundVideo/page";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  
  return (
    <>
      {!isAdmin && <BackgroundVideo />}
      {!isAdmin && <Navbar />}
      <div className={isAdmin ? "admin-layout" : ""}>
        {children}
      </div>
      {!isAdmin && <Footer />}
    </>
  );
} 