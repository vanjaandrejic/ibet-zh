import { useFormik, FormikValues } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import { axiosClient } from "../utils/axios";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object().shape({
  password: yup.string().required("Lozinka je obavezna"),
  newPassword: yup.string().required("Nova lozinka je obavezna"),
  reNewPassword: yup.string().required("Potvrdi novu lozinku"),
});

const ChangePasswordPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      reNewPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormikValues) => {
      try {
        setIsLoading(true);
        const result = await axiosClient.put(
          "ibet/profile/changePasswordForm.html",
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
      }

      // Explicitly define the type of values as FormikValues
    },
  });
  return (
    <Box sx={{ width: "90%", maxWidth: 600 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography fontSize={16} ml={1}>
          <b>Promena lozinke</b>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack gap={2} alignItems="center" marginTop={2}>
          <TextField
            required
            fullWidth
            color="warning"
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={
              typeof formik.errors.password === "string"
                ? formik.errors.password // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Trenutna Lozinka"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
          <TextField
            required
            fullWidth
            color="warning"
            error={!!(formik.touched.newPassword && formik.errors.newPassword)}
            helperText={
              typeof formik.errors.newPassword === "string"
                ? formik.errors.newPassword // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Unesite novu lozinku"
            name="newPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.newPassword}
          />
          <TextField
            required
            fullWidth
            color="warning"
            error={
              !!(formik.touched.reNewPassword && formik.errors.reNewPassword)
            }
            helperText={
              typeof formik.errors.reNewPassword === "string"
                ? formik.errors.reNewPassword // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="Potvrdite novu lozinku"
            name="reNewPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.reNewPassword}
          />

          <Button
            size="large"
            sx={{
              backgroundColor: "#FFC211",
              color: "black",
              textTransform: "none",
              width: "100%",
            }}
            type="submit"
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
          >
            {isLoading ? <CircularProgress size={24} /> : <b>Sačuvaj</b>}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ChangePasswordPage;
