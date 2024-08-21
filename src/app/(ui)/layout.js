import { Inter } from "next/font/google";
import "@/app/globals.css";

import NavBar from "@/components/frontDesign/NavBar/NavBar";
import { AuthProvider } from "@/context/authContext/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_TITLE}`,
  description:
    "Anam Chemistry Academy is developed by Md Shadat Hossain Tanim and Md Junayed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        {/* <ReduxProvider>{children}</ReduxProvider> */}
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
