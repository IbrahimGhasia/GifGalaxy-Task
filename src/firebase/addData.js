import { app } from "../firebase/config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);
export default async function addData(collection, id, data) {
	let result;
	try {
		result = await setDoc(doc(db, collection, id), data, {
			merge: true,
		});
		console.log("Added", result);
	} catch (e) {
		console.error(e);
	}

	return { result };
}
