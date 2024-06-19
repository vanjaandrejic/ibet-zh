import { axiosClient } from "../../axios";

const fetchUserName = async (setAccountUserName: (data: any) => void) => {
  try {
    const authToken = localStorage.getItem("__ibet-mobile/_ionickv/auth-token");
    const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

    if (!authToken || !utkn) return;

    const result = await axiosClient.get(
      "ibet/async/getUsername.json?mobileVersion=2.32.10.5&locale=sr",
      {
        headers: {
          "X-Auth-Token": authToken,
          Utkn: utkn,
        },
      }
    );

    setAccountUserName(result.data.string);
    // console.log(result.data.string);
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
  }
};

export default fetchUserName;
