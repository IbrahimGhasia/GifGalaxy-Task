import { Loader2 } from "lucide-react";

const Loader = () => {
	return (
		<div className="flex justify-center items-center w-full">
			<Loader2 className="w-20 h-20 animate-spin text-gray-700" />
		</div>
	);
};

export default Loader;
