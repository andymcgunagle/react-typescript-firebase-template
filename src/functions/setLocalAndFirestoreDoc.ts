import { DocumentData, DocumentReference, setDoc } from "firebase/firestore";

export async function setLocalAndFirestoreDoc(
  docRef: DocumentReference<DocumentData>,
  data: { [key: string]: any; },
  documentName: string,
) {
  await setDoc(docRef, data);

  localStorage.setItem(documentName, JSON.stringify(data));
};