import { User } from "../../../types/user";
import { axiosClient } from "../../axios";

const fetchUser = async (setUser: (data: User) => void) => {
  try {
    const authToken = localStorage.getItem("__ibet-mobile/_ionickv/auth-token");
    const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

    if (!authToken || !utkn) return;

    const result = await axiosClient.get("ibet/profile/iUserAccount.json", {
      headers: {
        "X-Auth-Token": authToken,
        Utkn: utkn,
      },
    });
    setUser(result.data);
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
  }
};

export default fetchUser;
