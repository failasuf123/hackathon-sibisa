import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig"; 

export const updateUserProfilePictureIfChanged = async (userId: string, newPictureUrl: string) => {
  const userRef = doc(db, "Users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const currentPictureUrl = userDoc.data().userPicture;

    if (currentPictureUrl !== newPictureUrl) {
      await updateDoc(userRef, {
        userPicture: newPictureUrl,
      });
      console.log("Profile picture updated in Firestore!");
    } else {
      console.log("Profile picture is the same, no update needed.");
    }
  } else {
    console.log("User not found in Firestore.");
  }
};