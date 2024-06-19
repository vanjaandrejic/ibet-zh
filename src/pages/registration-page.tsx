import { useFormik, FormikValues } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import { axiosClient } from "../utils/axios";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Unesite validan email")
    .required("Email je obavezan"),
  firstname: yup.string().required("Ime je obavezno"),
  lastname: yup.string().required("Prezime je obavezno"),
  notMinor: yup
    .boolean()
    .oneOf([true], "Potrebno je potvrditi da niste maloletni"),
  password: yup.string().required("Lozinka je obavezna"),
  politician: yup
    .boolean()
    .oneOf([true], "Potrebno je potvrditi da niste Državni funkcioner"),
  privacy: yup.boolean().oneOf([true], "Potrebno je prihvatiti privatnost"),
  reEmail: yup
    .string()
    .oneOf([yup.ref("email"), undefined], "Email adrese se moraju poklapati"), // Promena null u undefined
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Lozinke se moraju poklapati"), // Promena null u undefined
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "Potrebno je prihvatiti uslove korišćenja"),
  username: yup
    .string()
    .required("Korisničko ime je obavezno")
    .min(6, "Mora sadržati najmanje 6 karaktera"),
});

import { useNavigate } from "react-router-dom";

const RegistrationPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      notMinor: false,
      password: "",
      politician: false,
      privacy: false,
      reEmail: "",
      rePassword: "",
      termsAndConditions: false,
      username: "",
      affiliate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormikValues) => {
      try {
        if (!values.affiliate) {
          values.affiliate = "BAKA";
        }
        setIsLoading(true);
        const result = await axiosClient.put(
          "ibet/register/first-step.html",
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(result.data);
        console.log(values);
        // navigate("/account");
        if (result.status === 200) {
          toast.success(result.data.message);
          navigate("/");
        } else {
          toast.info(result.data.message);
        }
      } catch (error) {
        toast.error(String(error));
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
        values.affiliate = "";
      }
    },
  });
  return (
    <Box sx={{ width: "90%" }}>
      <Typography fontSize={16}>
        <b>Registracija</b>
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack gap={1.6} alignItems="center" marginTop={2}>
          <TextField
            color="warning"
            required
            fullWidth
            error={!!(formik.touched.firstname && formik.errors.firstname)}
            helperText={
              typeof formik.errors.firstname === "string"
                ? formik.errors.firstname // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Ime"
            name="firstname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="string"
            value={formik.values.firstname}
          />
          <TextField
            color="warning"
            required
            fullWidth
            error={!!(formik.touched.lastname && formik.errors.lastname)}
            helperText={
              typeof formik.errors.lastname === "string"
                ? formik.errors.lastname // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Prezime"
            name="lastname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="string"
            value={formik.values.lastname}
          />

          <TextField
            color="warning"
            required
            fullWidth
            error={!!(formik.touched.username && formik.errors.username)}
            helperText={
              typeof formik.errors.username === "string"
                ? formik.errors.username // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Korisničko ime"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="string"
            value={formik.values.username.toLowerCase()}
          />

          <TextField
            color="warning"
            required
            fullWidth
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={
              typeof formik.errors.email === "string"
                ? formik.errors.email // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />

          <TextField
            color="warning"
            required
            fullWidth
            error={!!(formik.touched.reEmail && formik.errors.reEmail)}
            helperText={
              typeof formik.errors.reEmail === "string"
                ? formik.errors.reEmail // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Potvrdite e-mail"
            name="reEmail"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.reEmail}
          />

          <TextField
            color="warning"
            required
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={
              typeof formik.errors.password === "string"
                ? formik.errors.password // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            fullWidth
            label="Lozinka"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />

          <TextField
            color="warning"
            required
            fullWidth
            error={!!(formik.touched.rePassword && formik.errors.rePassword)}
            helperText={
              typeof formik.errors.rePassword === "string"
                ? formik.errors.rePassword // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Potvrda Lozinke"
            name="rePassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.rePassword}
          />
          <TextField
            color="warning"
            fullWidth
            error={!!(formik.touched.affiliate && formik.errors.affiliate)}
            helperText={
              typeof formik.errors.affiliate === "string"
                ? formik.errors.affiliate // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Promo kod"
            name="affiliate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="string"
            value={formik.values.affiliate}
            sx={{ margin: 0.5 }}
          />

          {/* <TextField
            error={!!(formik.touched.rePassword && formik.errors.rePassword)}
            helperText={
              typeof formik.errors.rePassword === "string"
                ? formik.errors.rePassword // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Potvrda Lozinke"
            name="rePassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography fontSize={13}>
                Prihvatam opšte uslove korišćenja
              </Typography>
              <Checkbox
                name="termsAndConditions"
                onChange={(e) => {
                  formik.setFieldValue("termsAndConditions", e.target.checked);
                }}
                checked={formik.values.termsAndConditions}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography fontSize={13}>Privatnost</Typography>
              <Checkbox
                name="privacy"
                onChange={(e) => {
                  formik.setFieldValue("privacy", e.target.checked);
                }}
                checked={formik.values.privacy}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
            </Box>

            {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={13}>Nisam državni funkcioner</Typography>
            <Checkbox />
          </Box> */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography fontSize={13}>Nisam državni funkcioner</Typography>
              <Checkbox
                name="politician"
                onChange={(e) => {
                  formik.setFieldValue("politician", e.target.checked);
                }}
                checked={formik.values.politician}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
            </Box>

            {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={13}>Da, imam više od 18 godina</Typography>
            <Checkbox />
          </Box> */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography fontSize={13}>Da, imam više od 18 godina</Typography>
              <Checkbox
                name="notMinor"
                onChange={(e) => {
                  formik.setFieldValue("notMinor", e.target.checked);
                }}
                checked={formik.values.notMinor}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
            </Box>
          </Box>

          <Button
            size="large"
            sx={{
              mt: 3,
              mb: 3,
              backgroundColor: "#FFC211",
              color: "black",
              width: "100%",
              textTransform: "none",
            }}
            type="submit"
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
          >
            {isLoading ? <CircularProgress size={24} /> : <b>Potvrdi</b>}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationPage;
