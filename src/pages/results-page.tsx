import { FC, useEffect } from "react";

const ResultPage: FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/api-wager", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            p_username: "marcco",
            p_password: "newfrontback",
            p_from_date: "01.07.2024",
            p_to_date: "19.07.2024",
            p_online_user: "bakaprase",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <div>ResultPage</div>;
};

export default ResultPage;
