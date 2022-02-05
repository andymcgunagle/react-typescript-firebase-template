import { DocumentData, DocumentReference } from "firebase/firestore";

import { getFirestoreDoc } from "./getFirestoreDoc";

export async function getLocalOrFirestoreDoc(
  docRef: DocumentReference<DocumentData>,
  documentName: string,
) {
  const localData = localStorage.getItem(documentName);

  if (localData) {
    return JSON.parse(localData);
  } else {
    const firestoreData = await getFirestoreDoc(docRef);
    localStorage.setItem(documentName, JSON.stringify(firestoreData));
    return firestoreData;
  };
};
