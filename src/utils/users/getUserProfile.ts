import { saveUserToFirestore } from "@/service/signin/postUserToFirestore";
import { updateUserProfilePictureIfChanged } from "@/service/signin/updateUserProfilePictureIfChanged";
import axios from "axios";

export const getUserProfile = async (tokenInfo: any) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      }
    );

    const userData = response.data;
    console.log("hai")

    // Simpan data user ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.getItem("user")

    localStorage.setItem("user", JSON.stringify(response.data));
    const userDataGet = response.data;  
    const userId = userDataGet.id;
    const username = userDataGet.name;
    console.log(
      `username:${username} \n
      userId:${userId}`
    )
    // Simpan data user ke Firestore (jika belum ada)
    await saveUserToFirestore(userData);

    // Perbarui URL foto profil di Firestore jika berbeda
    await updateUserProfilePictureIfChanged(userData.id, userData.picture);

  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};