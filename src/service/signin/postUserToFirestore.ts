import { setDoc } from "firebase/firestore";

export const saveUserToFirestore = async (userRef: any, userData: any) => {
  await setDoc(userRef, {
    userId: userData.id,
    username: userData.name,
    userEmail: userData.email,
    userPicture: userData.picture,
    userRole: "desa" // kasih default role
  });
};
