import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

import { LandingProvider } from "@/utils/provider";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Wild Bootcamp Ride",
	description: "Assess yourself",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<LandingProvider>
				<html lang="en">
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#3f1046]`}
					>
						<header className="flex justify-end items-center p-4 gap-4 h-16">
							<div>
								<Image
									className="woohoo"
									src="/rollercoaster (1).jpg"
									alt="wild ride"
									width="80"
									height="80"
								/>
							</div>
							<h2 className="text-2xl text-[#f7efe3]">
								All aboard the Wild Bootcamp 🎢 Ride!
							</h2>
							<NavBar />

							<SignedOut>
								<SignInButton />
								<SignUpButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</header>
						{children}
					</body>
				</html>
			</LandingProvider>
		</ClerkProvider>
	);
}
