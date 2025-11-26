import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addData = async (collectionName: string, data: object) => {
  await addDoc(collection(db, collectionName), data);
};

export const getData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
