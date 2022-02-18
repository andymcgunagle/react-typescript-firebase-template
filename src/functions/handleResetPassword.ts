import { verifyPasswordResetCode, confirmPasswordReset, Auth } from "firebase/auth";

// https://firebase.google.com/docs/auth/web/passing-state-in-email-actions
// https://firebase.google.com/docs/auth/custom-email-handler

export function handleResetPassword({
  actionCode,
  auth,
  newPassword,
}: HandleResetPasswordArgs) {
  // Verify the password reset code is valid.
  verifyPasswordResetCode(auth, actionCode).then(() => {
    // Save the new password.
    confirmPasswordReset(auth, actionCode, newPassword).then(() => {
      console.log('Password updated!');
    }).catch((error) => {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
      console.log(error);
    });
  }).catch((error) => {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
    console.log(error);
  });
};

interface HandleResetPasswordArgs {
  actionCode: string,
  auth: Auth,
  newPassword: string,
};