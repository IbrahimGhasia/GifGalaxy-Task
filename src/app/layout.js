import { Inter } from "next/font/google";
import "./globals.css";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<MaxWidthWrapper>
					<Navbar />
					{children}
				</MaxWidthWrapper>
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
