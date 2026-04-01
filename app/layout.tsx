import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CodeProvider } from "@/registry/br-hr/blocks/codes";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BY_HR Component Library",
	description: "BY_HR Component Library by shadcn/ui",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<CodeProvider>
					<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
						<header className="flex gap-1 justify-between">
							<Link href="/" className="text-3xl font-bold tracking-tight">
								BY_HR Component Library
							</Link>
							<nav className="flex gap-2">
								<Link
									href="/pdf-viewer"
									className="text-xl tracking-tight py-2 hover:underline"
								>
									PDF Creator
								</Link>
							</nav>
						</header>
						{children}
					</div>
				</CodeProvider>
			</body>
		</html>
	);
}
