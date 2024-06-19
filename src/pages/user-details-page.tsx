// import { Box, Button, Checkbox, Stack, TextField } from "@mui/material";
// import { FormikValues, useFormik } from "formik";
// import { FC } from "react";
// import * as yup from "yup";
// import { Typography } from "@mui/material";

// const UserDetailsPage: FC = () => {
//   // const navigate = useNavigate();
//   const formik = useFormik({
//     // initialValues: {
//     //   j_username: "",
//     //   j_password: "",
//     //   remember_me: false,
//     //   no_html: true,
//     // }
//     initialValues: {
//       ime: "",
//       prezime: "",
//       pol: "",
//       datumRodjenja: "",
//       drzava: "",
//       grad: "",
//       postBroj: "",
//       ulica: "",
//       broj: "",
//       brojLk: "",
//       brojTel: "",
//       tekRacun: "",
//     },
//     validationSchema: yup.object(),
//     onSubmit: async (values: FormikValues) => {
//       // Explicitly define the type of values as FormikValues
//       //   const form = new FormData();
//       //   Object.keys(values).forEach((key) => {
//       //     form.append(key, values[key]);
//       //   });
//       //   const result = await axiosClient.post("ibet/loginProcess", values, {
//       //     headers: {
//       //       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//       //     },
//       //   });
//       //   console.log(result.data);
//       //   localStorage.setItem(
//       //     "__ibet-mobile/_ionickv/auth-token",
//       //     result.data.token
//       //   );
//       //   localStorage.setItem("__ibet-mobile/_ionickv/utkn", result.data.utkn);
//       //   navigate("/");
//     },
//   });

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
//       <Typography sx={{ marginLeft: 3 }}>
//         <b>Detalji o korisniku</b>
//       </Typography>
//       <form noValidate onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
//         <Stack margin={2} spacing={2}>
//           <TextField
//             variant="filled"
//             error={!!(formik.touched.ime && formik.errors.ime)}
//             helperText={
//               typeof formik.errors.ime === "string"
//                 ? formik.errors.ime // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Ime"
//             name="ime"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.ime}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.prezime && formik.errors.prezime)}
//             helperText={
//               typeof formik.errors.prezime === "string"
//                 ? formik.errors.prezime // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Prezime"
//             name="prezime"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.prezime}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.pol && formik.errors.pol)}
//             helperText={
//               typeof formik.errors.pol === "string"
//                 ? formik.errors.pol // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Pol"
//             name="pol"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.pol}
//           />

//           <TextField
//             variant="filled"
//             error={
//               !!(formik.touched.datumRodjenja && formik.errors.datumRodjenja)
//             }
//             helperText={
//               typeof formik.errors.datumRodjenja === "string"
//                 ? formik.errors.datumRodjenja // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Datum Rodjenja"
//             name="datumRodjenja"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.datumRodjenja}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.drzava && formik.errors.drzava)}
//             helperText={
//               typeof formik.errors.drzava === "string"
//                 ? formik.errors.drzava // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Drzava"
//             name="drzava"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.drzava}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.grad && formik.errors.grad)}
//             helperText={
//               typeof formik.errors.grad === "string"
//                 ? formik.errors.grad // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Grad"
//             name="grad"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.grad}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.postBroj && formik.errors.postBroj)}
//             helperText={
//               typeof formik.errors.postBroj === "string"
//                 ? formik.errors.postBroj // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Postanski Broj"
//             name="postBroj"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.postBroj}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.ulica && formik.errors.ulica)}
//             helperText={
//               typeof formik.errors.ulica === "string"
//                 ? formik.errors.ulica // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Ulica"
//             name="ulica"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.ulica}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.broj && formik.errors.broj)}
//             helperText={
//               typeof formik.errors.broj === "string"
//                 ? formik.errors.broj // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Broj"
//             name="broj"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.broj}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.brojLk && formik.errors.brojLk)}
//             helperText={
//               typeof formik.errors.brojLk === "string"
//                 ? formik.errors.brojLk // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Broj Licne Karte"
//             name="brojLk"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.brojLk}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.brojTel && formik.errors.brojTel)}
//             helperText={
//               typeof formik.errors.brojTel === "string"
//                 ? formik.errors.brojTel // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Broj Telefona"
//             name="brojTel"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.brojTel}
//           />

//           <TextField
//             variant="filled"
//             error={!!(formik.touched.tekRacun && formik.errors.tekRacun)}
//             helperText={
//               typeof formik.errors.tekRacun === "string"
//                 ? formik.errors.tekRacun // If it's a string, use it directly
//                 : null // If it's not a string, provide an alternative value (e.g., null)
//             }
//             label="Tekuci Racun"
//             name="tekRacun"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="string"
//             value={formik.values.tekRacun}
//           />
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography fontSize={13}>
//               Želim da primam e-mail od ove kompanije
//             </Typography>
//             <Checkbox />
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography fontSize={13}>
//               Želim da primam obaveštenja putem sms-a
//             </Typography>
//             <Checkbox />
//           </Box>
//           {/* <Checkbox {...label} /> */}

//           <Button
//             size="large"
//             sx={{
//               mt: 3,
//               width: "100%",
//               backgroundColor: "#FFC211",
//               color: "black",
//               textTransform: "none",
//             }}
//             type="submit"
//             variant="contained"
//           >
//             <b>Potvrdi</b>
//           </Button>
//         </Stack>
//       </form>
//     </Box>
//   );
// };

// export default UserDetailsPage;
