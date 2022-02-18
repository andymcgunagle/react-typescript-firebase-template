import { DocumentData, DocumentReference } from "firebase/firestore";

import { getFirestoreDocData } from "./getFirestoreDocData";

export async function getLocalOrFirestoreDoc(
  docRef: DocumentReference<DocumentData>,
  documentName: string,
) {
  const localData = localStorage.getItem(documentName);

  if (localData) {
    return JSON.parse(localData);
  } else {
    const firestoreData = await getFirestoreDocData(docRef);

    if (firestoreData) {
      localStorage.setItem(documentName, JSON.stringify(firestoreData));
      return firestoreData;
    } else {
      return null;
    };
  };
};
