import { db } from "@/service/firebaseConfig";
import { saveUserToFirestore } from "@/service/signin/postUserToFirestore";
import { redirectLoginManagement } from "@/service/signin/redirectLoginManagement";
import { updateUserProfilePictureIfChanged } from "@/service/signin/updateUserProfilePictureIfChanged";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";



export const getUserProfile = async (tokenInfo: any) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData));

    const userRef = doc(db, "Users", userData.id);
    let userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await saveUserToFirestore(userRef, userData);
      userDoc = await getDoc(userRef);
    }

    await updateUserProfilePictureIfChanged(userData.id, userData.picture);

    const finalUserData = { id: userDoc.id, ...(userDoc.data() as any) };
    
    Cookies.set("user", JSON.stringify(finalUserData), { expires: 7 }); 
    Cookies.set("userRole", finalUserData.userRole, { expires: 7 });

    redirectLoginManagement();

  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};
