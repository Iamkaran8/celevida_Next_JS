import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ReduxProvider } from "./providers/ReduxProvider";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
});
export const metadata = {
  title: "Celevida",
  description: "Celevida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} `} >
        
          <ReduxProvider>
          {children}
          </ReduxProvider>
        
      </body>
    </html>
  );
}
