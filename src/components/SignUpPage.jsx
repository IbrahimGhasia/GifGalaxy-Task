/* eslint-disable @next/next/no-img-element */
const SignUpPage = () => {
	return (
		<div className="rounded-lg border-2 border-dashed border-zinc-200 p-12">
			<div className="flex h-full flex-col items-center justify-center space-y-1">
				<div
					aria-hidden="true"
					className="relative mb-4 h-40 w-40 text-muted-foreground"
				>
					<img
						src={"/oops.webp"}
						alt="oops image"
						className="w-full h-full object-cover aspect-square"
					/>
				</div>
				<h3 className="font-semibold text-xl md:text-2xl">
					You are not Logged In
				</h3>
				<p className="text-muted-foreground text-center text-sm">
					Sign up to new account or logged in to existing account!
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;
