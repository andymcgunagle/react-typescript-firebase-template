import { DocumentData, DocumentReference, getDoc, updateDoc } from "firebase/firestore";

export const updateDocIfExists = async (
  docRef: DocumentReference<DocumentData>,
  update: { [key: string]: any; },
) => {
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, update);
  } else {
    console.log("No such document!");
  };
};