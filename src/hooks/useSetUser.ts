import { useEffect } from "react";

import { firebaseAuth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { useTypedDispatch } from "../redux/store";
import { setUid } from "../redux/authSlice";

export default function useSetUser() {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        dispatch(setUid(user.uid));
      } else {
        dispatch(setUid(null));
      };
    });

    return () => unsubscribe();
  }, [dispatch]);
};