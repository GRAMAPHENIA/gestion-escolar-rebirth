// layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";
import { Toaster } from "react-hot-toast";
import CustomToaster from "@/components/toast/CustomToast";
// Configuración de fuentes
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Para evitar el FOUT
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", // Para evitar el FOUT
});

export const metadata = {
  title: "Gestión Escolar",
  description: "Plataforma de gestión para profesores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased">
        <ThemeSwitcher /> {/* Componente del lado del cliente */}
        {/* <Toaster position="top-right" /> */}
        <CustomToaster/>
        {children}
      </body>
    </html>
  );
}
