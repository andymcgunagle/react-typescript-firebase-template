import { resetAuth } from "../redux/authSlice";
import { useTypedDispatch } from "../redux/store";

import { useNavigate } from "react-router-dom";

import { deleteUser } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export function useDeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const deleteAccount = async () => {
    try {
      if (firebaseAuth.currentUser) await deleteUser(firebaseAuth.currentUser);
      localStorage.clear();
      dispatch(resetAuth(null));
      navigate({ pathname: '/' });
    } catch (error: any) {
      console.error(error.message);
    };
  };

  return deleteAccount;
};
