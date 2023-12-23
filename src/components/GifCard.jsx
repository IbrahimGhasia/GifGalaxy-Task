/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import addData from "@/firebase/addData";
import { toast } from "sonner";
import { ArrowRight, Star } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";

const GifCard = ({ data: gifData, user, showStar }) => {
	const [added, setAdded] = useState(false);
	const addToFavourite = async () => {
		const data = {
			user_email: user.email,
			gif_object: gifData,
		};

		const { result } = await addData("favourite_gif", gifData.id, data);
		setAdded(true);
	};

	return (
		<Popover>
			<div className="max-w-72">
				<PopoverTrigger>
					<img
						src={gifData.images.fixed_height.url}
						alt={gifData.tile}
						className="h-72 w-72 object-cover aspect-square rounded-md"
					/>
				</PopoverTrigger>
				<p className="text-sm my-2 text-muted-foreground font-semibold">
					{gifData.title}
				</p>

				<div className="flex items-start justify-between">
					<div>
						{gifData.user ? (
							<p className="text-md font-bold text-gray-900">
								{gifData.user.display_name}
							</p>
						) : (
							<p className="text-md font-bold text-gray-900">
								Unkown
							</p>
						)}
					</div>
					{showStar && (
						<div
							className={`rounded-full border-yellow-500 border p-1 hover:bg-yellow-500 group cursor-pointer ${
								added ? "bg-yellow-500" : ""
							}`}
							onClick={() => {
								addToFavourite();
								toast.success("Added to your favourites");
							}}
						>
							<Star
								className={`text-yellow-500 group-hover:text-white ${
									added ? "text-white" : ""
								}`}
							/>
						</div>
					)}
				</div>
			</div>

			<PopoverContent side="bottom">
				{gifData.user ? (
					<div>
						<div className="flex gap-2 items-center pb-2 border-b">
							<Avatar>
								<AvatarImage src={gifData.user.avatar_url} />
							</Avatar>
							<p className="text-lg font-semibold">
								{gifData.username}
							</p>
						</div>

						<p className="text-sm mt-2 text-muted-foreground">
							{gifData.user.description}
						</p>

						<a
							href={gifData.user.profile_url}
							target="_black"
							className="text-blue-500 text-sm underline flex items-center gap-1"
						>
							View Profile
							<ArrowRight className="h-4 w-4" />
						</a>
					</div>
				) : (
					<p className="text-sm font-semibold text-red-500">
						Oh oh!. User data not available :{"("}
					</p>
				)}
			</PopoverContent>
		</Popover>
	);
};
export default GifCard;
