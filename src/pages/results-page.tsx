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
          // body: JSON.stringify({

          // }),
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
