// import { FC, useState, useEffect } from "react";
// import axios from "axios";

// const SearchDrawer: FC = () => {
//   const [search, setSearch] = useState<string>("");
//   const [searchResult, setSearchResult] = useState<any>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchSearch = async () => {
//       try {
//         const response = await axios.get(
//           `https://www.365.rs/ibet/search/matchesSearch/${search}.json`,
//           {
//             params: {
//               mobileVersion: "2.27.33",
//               locale: "sr",
//             },
//           }
//         );
//         setSearchResult(response.data.matches);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchSearch();
//   }, [search]);

//   return <div>searchDrawer</div>;
// };

// export default SearchDrawer;
