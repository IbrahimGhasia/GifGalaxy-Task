"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { User } from "lucide-react";

import { Button, buttonVariants } from "./ui/button";

const Navbar = () => {
	const [user] = useAuthState(auth);
	const router = useRouter();

	return (
		<div className="sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white">
				<div className="border-b border-gray-200">
					<div className="flex h-16 items-center">
						<div className="ml-4 flex lg:ml-0">
							<Link
								href="/"
								className="text-xl md:text-3xl font-bold text-gray-900"
							>
								GifGalaxy
							</Link>
						</div>

						<div className="ml-auto flex items-center">
							{user ? (
								<Link
									className={buttonVariants({
										variant: "link",
									})}
									href={`${user.email}`}
								>
									<User className="h-4 w-4 mr-1" />
									My Profile
								</Link>
							) : (
								<Link
									href="/sign-in"
									className={buttonVariants({
										variant: "ghost",
									})}
								>
									Sign In
								</Link>
							)}

							<span className="h-6 w-px bg-gray-200 mx-2"></span>

							{user ? (
								<Button
									href="/sign-up"
									variant="ghost"
									onClick={() => {
										signOut(auth);
										toast.success("Logged Out!");
										router.push("/");
									}}
								>
									Logout
								</Button>
							) : (
								<Link
									href="/sign-up"
									className={buttonVariants({
										variant: "ghost",
									})}
								>
									Sign Up
								</Link>
							)}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};
export default Navbar;
