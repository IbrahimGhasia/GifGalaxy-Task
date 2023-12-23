import { app } from "../firebase/config";
import {
	getFirestore,
	getDocs,
	query,
	where,
	collection,
} from "firebase/firestore";

const db = getFirestore(app);

export default async function getData(collection_name, email) {
	const q = query(
		collection(db, collection_name),
		where("user_email", "==", email)
	);

	let result = null;
	let error = null;
	try {
		const querySnapshot = await getDocs(q);
		result = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (e) {
		error = e;
	}

	return { result, error };
}
