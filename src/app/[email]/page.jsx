/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import getData from "@/firebase/getData";
import { User } from "lucide-react";

import GifCard from "@/components/GifCard";

const Page = () => {
	const [favouriteGifs, setFavouriteGifs] = useState([]);
	const [user] = useAuthState(auth);
	useEffect(() => {
		const getFavouriteGifs = async () => {
			try {
				const { result, error } = await getData(
					"favourite_gif",
					user.email
				);

				if (error) {
					console.error("Error fetching documents:", error.message);
				} else {
					setFavouriteGifs(result);
				}
			} catch (e) {
				console.error("Error:", e.message);
			}
		};

		getFavouriteGifs();
	}, [user]);

	return (
		<div className="mt-10 mb-10">
			<div className="flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="flex gap-3 md:gap-5 items-center">
					<Link href={"/"}>
						<p className="hover:text-blue-500 hover:underline text-sm md:text-lg">
							Home
						</p>
					</Link>
					<span className="border-l rotate-[25deg] h-5 border-gray-400"></span>
					<p className="underline cursor-pointer hover:text-blue-500 text-sm md:text-lg">
						Profile
					</p>
				</div>

				<div className="flex gap-2 items-center mt-2 md:mt-0">
					<User className="h-4 w-4 md:h-6 md:w-6" />
					{user && (
						<h1 className="text-sm md:text-lg underline">
							{user.email}
						</h1>
					)}
				</div>
			</div>

			<h1 className="text-lg md:text-2xl text-gray-900 font-semibold mt-5">
				Your Favourite Gifs
			</h1>
			<div className="flex flex-col justify-center items-center">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
					{favouriteGifs.map((data) => (
						<GifCard
							data={data.gif_object}
							showStar={false}
							key={data.id}
							removeFavorite={() => removeFavorite(data.id)}
						/>
					))}
				</div>

				{favouriteGifs.length === 0 && (
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
								You Don&apos;t have any favourite gif.
							</h3>
							<p className="text-muted-foreground text-center text-sm">
								Add your favourite gifs to see here
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default Page;
