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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import NavigationContext from "../store/navigation-context";
// import SocketContext from "../store/socket-context";
// import connectWebSocket from "../utils/socket-utils/connect-web-socket";

const validationSchema = yup.object().shape({
  j_password: yup.string().required("密码是必填项"),
  j_username: yup
    .string()
    .required("名字是必填项")
    .min(6, "Mora sadržati najmanje 6 karaktera"),
});

const AccountPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { accountUserName, iUserInfo } = useContext(NavigationContext);
  // const { setSocketMessage } = useContext(SocketContext);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      j_username: "",
      j_password: "",
      remember_me: false,
      no_html: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormikValues) => {
      try {
        setIsLoading(true);
        const form = new FormData();
        Object.keys(values).forEach((key) => {
          form.append(key, values[key]);
        });
        const result = await axiosClient.post("ibet/loginProcess", values, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cstamp: localStorage.getItem("__ibet-storage/_ionickv/cstamp"),
          },
        });
        localStorage.setItem(
          "__ibet-mobile/_ionickv/auth-token",
          result.data.token
        );
        localStorage.setItem("__ibet-mobile/_ionickv/utkn", result.data.utkn);
        localStorage.setItem("__ibet-mobile/_ionickv/uuid", result.data.uuid);
        localStorage.setItem(
          "__ibet-storage/_ionickv/cstamp",
          result.data.cstamp
        );
        if (result.status === 200) {
          toast.success("Uspešno ste se prijavili!");
          navigate("/");
          // connectWebSocket({ accountUserName, iUserInfo, setSocketMessage });
        }
        navigate("/");
      } catch (error) {
        toast.error("Greška tokom prijavljivanja!");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }

      // Explicitly define the type of values as FormikValues
    },
  });
  return (
    <Box sx={{ width: "90%" }}>
      <Typography fontSize={16}>
        <b>登录</b>
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack gap={2} alignItems="center" marginTop={2}>
          <TextField
            required
            fullWidth
            color="warning"
            error={!!(formik.touched.j_username && formik.errors.j_username)}
            helperText={
              typeof formik.errors.j_username === "string"
                ? formik.errors.j_username // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="用户名"
            name="j_username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.j_username}
          />
          <TextField
            required
            fullWidth
            color="warning"
            error={!!(formik.touched.j_password && formik.errors.j_password)}
            helperText={
              typeof formik.errors.j_password === "string"
                ? formik.errors.j_password // If it's a string, use it directly
                : null // If it's not a string, provide an alternative value (e.g., null)
            }
            label="密码"
            name="j_password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.j_password}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <Checkbox
                name="rememberMe"
                // onChange={(e) => {
                //   formik.setFieldValue("termsAndConditions", e.target.checked);
                // }}
                // checked={formik.values.termsAndConditions}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
              <Typography fontSize={13}>记住我</Typography>
            </Box>
          </Box>
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
            {isLoading ? <CircularProgress size={24} /> : <b>登录</b>}
          </Button>
          <Button
            size="large"
            sx={{
              backgroundColor: "#FF581D",
              textTransform: "none",
              width: "100%",
            }}
            variant="contained"
            onClick={() => navigate("/registration")}
          >
            <b>注册</b>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AccountPage;
