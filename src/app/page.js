/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Search, Clapperboard, Trash, User } from "lucide-react";

import GifCard from "@/components/GifCard";
import SignUpPage from "@/components/SignUpPage";

import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
	const [user] = useAuthState(auth);
	const [gifs, setGifs] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);

	// console.log(user);

	useEffect(() => {
		const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);

		const getGif = async () => {
			try {
				setLoading(true);
				let fetchedGifs;
				console.log(searchQuery);
				if (searchQuery) {
					fetchedGifs = await gf.search(searchQuery, {});
				} else {
					fetchedGifs = await gf.trending();
				}
				console.log(fetchedGifs);
				setGifs(fetchedGifs.data);
			} catch (error) {
				console.error("Error Fetching GIFS", error);
			} finally {
				setLoading(false);
			}
		};
		getGif();
	}, [searchQuery]);

	return (
		<div className="mb-10 mt-10">
			<div className="flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="flex gap-3 md:gap-5 items-center">
					<p className="underline cursor-pointer text-sm md:text-lg">
						Home
					</p>
					{user && (
						<span className="border-l rotate-[25deg] h-5 border-gray-400"></span>
					)}
					{user && (
						<Link href={user.email}>
							<p className="cursor-pointer hover:text-blue-500 hover:underline text-sm md:text-lg">
								Profile
							</p>
						</Link>
					)}
				</div>

				{user && (
					<div className="flex gap-2 items-center mt-2 md:mt-0">
						<User className="h-4 w-4 md:h-6 md:w-6" />
						<h1 className="text-sm md:text-lg underline">
							{user.email}
						</h1>
					</div>
				)}
			</div>

			<h3 className="mt-10 text-sm md:text-xl text-gray-900 underline">
				<Clapperboard className="h-6 md:h-10 w-6 md:w-10" />
				Explore the Infinite Universe of Animated Delights – GifGalaxy,
				Where Every Frame Sparks Joy!
			</h3>
			<div className="mt-6 flex w-full items-center space-x-2">
				<Input
					placeholder="Enter keywords ..."
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<Button className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700">
					<Search className="h-4 w-4" />
					Search
				</Button>
				<Button
					className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700"
					onClick={() => setSearchQuery("")}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</div>

			{user && (
				<div className="flex flex-col justify-center items-center">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
						{loading ? (
							<div className="flex flex-row gap-5">
								<Skeleton className="h-72 w-72 object-cover aspect-square rounded-md" />
								<Skeleton className="h-72 w-72 object-cover aspect-square rounded-md" />
								<Skeleton className="h-72 w-72 object-cover aspect-square rounded-md" />
							</div>
						) : (
							gifs.map((data) => (
								<GifCard
									data={data}
									user={user}
									showStar={true}
									key={data.id}
								/>
							))
						)}
					</div>
				</div>
			)}

			{user && gifs.length === 0 && (
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
							No Result Found.
						</h3>
						<p className="text-muted-foreground text-center text-sm">
							Sorry!! No gifs found for the input {searchQuery}
						</p>
					</div>
				</div>
			)}

			{!user && (
				<div className="flex flex-col justify-center items-center mt-10">
					<SignUpPage />
				</div>
			)}
		</div>
	);
}
