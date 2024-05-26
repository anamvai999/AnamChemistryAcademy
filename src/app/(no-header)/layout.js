import "@/app/globals.css";
import { AuthProvider } from "@/context/authContext/AuthProvider";



export const metadata = {
  title: "Anam Chemistry Academy | Sign Up",
  description: "Anam Chemistry Academy is developed by Md Shadat Hossain Tanim and Md Junayed",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
