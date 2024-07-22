import fetch from "node-fetch";

export default async (req, res) => {
  const url = "https://ords.365.rs/ords/pwin/ic_user_ords/GET_USER_STAT";

  // Dobijanje IP adrese iz zahteva
  const requestIpAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`Request received from IP address: ${requestIpAddress}`);

  const body = {
    p_username: "marcco",
    p_password: "newfrontback",
    ...req.body,
  };

  try {
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("BODY", req.body);

    if (!apiResponse.ok) {
      throw new Error(`API call failed with status: ${apiResponse.status}`);
    }

    // Logovanje IP adrese servera koji je odgovorio
    const responseIpAddress =
      apiResponse.headers.get("x-forwarded-for") || "N/A";
    console.log(`Response received from IP address: ${responseIpAddress}`);

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API call error:", error.message);
    res.status(500).json({
      error: "Failed to fetch data from the external API",
      message: error.message,
    });
  }
};
