import { useFormik, FormikValues } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import { axiosClient } from "../utils/axios";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email je obavezan"),
});

const ResetPasswordEmailPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      return: "/user-login",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormikValues) => {
      try {
        setIsLoading(true);
        const form = new FormData();
        Object.keys(values).forEach((key) => {
          form.append(key, values[key]);
        });
        const result = await axiosClient.post(
          "ibet/rasswordRecovery.html",
          values,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        );

        if (result.status === 200) {
          toast.success(result.data.message);
          navigate("/");
        }
        navigate("/");
      } catch (error) {
        toast.error(String(error));
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
        navigate("/account");
      }

      // Explicitly define the type of values as FormikValues
    },
  });
  return (
    <Box sx={{ width: "90%", maxWidth: 1000 }}>
      <Typography fontSize={12}>
        <b>
          Molimo unesite Vašu e-mai adresu da biste dobili e-mail u kome će biti
          opisano kako promeniti lozinku!
        </b>
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack gap={2} alignItems="center" marginTop={2}>
          <TextField
            required
            fullWidth
            color="warning"
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
            {isLoading ? <CircularProgress size={24} /> : <b>OK</b>}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ResetPasswordEmailPage;
