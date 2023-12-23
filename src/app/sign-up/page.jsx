"use client";

import Link from "next/link";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator } from "@/lib/AuthCredentialsValidator";

const Page = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth);

	const onSubmit = async ({ email, password }) => {
		try {
			console.log(email, password);
			const res = await createUserWithEmailAndPassword(email, password);
			if (!res) {
				toast.error("Email Already Exist! Use other email or sign-in");
			} else {
				toast.success("Sign-up Successfully!");
				router.push("/sign-in");
			}
		} catch (error) {
			console.error(error);
			return;
		}
	};

	return (
		<div className="-mt-16">
			<div className="container relative flex flex-col items-center justify-center h-screen lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<h1 className="text-2xl font-bold">
							Sign Up to GifGalaxy
						</h1>

						<Link
							href="/sign-in"
							className={buttonVariants({
								variant: "link",
								className: "gap-1.5",
							})}
						>
							Already have an account? Sign-in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="grid gap-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="email">Email</Label>
									<Input
										placeholder="you@example.com"
										{...register("email")}
										className={cn({
											"focus-visible:ring-red-500":
												errors.email,
										})}
									/>
									{errors?.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="grid gap-1 py-2">
									<Label htmlFor="password">Password</Label>
									<Input
										placeholder="Password"
										{...register("password")}
										className={cn({
											"focus-visible:ring-red-500":
												errors.password,
										})}
										type="password"
									/>
									{errors?.password && (
										<p className="text-sm text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>

								<Button>Sign up</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Page;
