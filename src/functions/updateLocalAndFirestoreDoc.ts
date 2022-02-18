import { DocumentData, DocumentReference } from "firebase/firestore";

import { updateDocIfExists } from "./updateDocIfExists";

export async function updateLocalAndFirestoreDoc(
  docRef: DocumentReference<DocumentData>,
  documentName: string,
  update: { [key: string]: any; },
) {
  await updateDocIfExists(docRef, update);

  const localDoc = localStorage.getItem(documentName);

  if (localDoc) {
    localStorage.setItem(documentName, JSON.stringify({ ...JSON.parse(localDoc), ...update }));
  };
};