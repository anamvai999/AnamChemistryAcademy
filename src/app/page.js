import NavBar from "@/components/frontDesign/NavBar/NavBar";
import Category from "@/components/frontDesign/category/Category";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <NavBar />
      <Category />
    </main>
  );
}
