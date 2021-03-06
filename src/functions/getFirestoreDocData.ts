import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";

export const getFirestoreDocData = async (docRef: DocumentReference<DocumentData>) => {
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  };
};