import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { User } from "../types/user";
import { axiosClient } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object().shape({
  paymentValue: yup
    .number()
    .required("Iznos za isplatu je obavezan")
    .min(500, "Minimalna vrednost isplate je 500"),

  bankAccount: yup.string().required("Tekući račun je obavezan"),
});

const PayoutBankAccount: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

        if (!authToken || !utkn) return;

        const result = await axiosClient.get("ibet/profile/iUserAccount.json", {
          headers: {
            "X-Auth-Token": authToken,
            Utkn: utkn,
          },
        });

        console.log(result.data);
        setUser(result.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      paymentValue: "",
      bankAccount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new URLSearchParams();
        formData.append("amount", values.paymentValue);
        formData.append("locationCode", "2001"); // iuserParams gde je terminal
        formData.append("wdType", "BACC");
        formData.append("bankAcc", values.bankAccount);
        formData.append("balance", String(user?.balance));

        const headers = {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Auth-Token": localStorage.getItem(
            "__ibet-mobile/_ionickv/auth-token"
          ),
          Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
        };

        const response = await axios.post(
          "https://ibet2.365.rs/ibet/profile/withdrawalRequest.html?mobileVersion=2.27.49&locale=sr",
          formData.toString(),
          {
            headers: headers,
          }
        );
        window.location.reload();

        console.log(response);
      } catch (error) {
        console.error("Greška pri slanju podataka:", error);
      }
    },
  });

  const declinePaymentRequest = async () => {
    try {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Auth-Token": localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        ),
        Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
      };
      const response = await axios.get(
        "https://ibet2.365.rs/ibet/profile/withdrawalCancel.json?mobileVersion=2.27.49&locale=sr",
        {
          headers: headers,
        }
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 800,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Typography fontSize={16}>
          <b>Isplata na tekući račun</b>
        </Typography>

        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          width: "90%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography fontSize={12}>
          Unesite željeni iznos za isplatu. Zahtev za isplatu je moguć ukoliko
          nema aktuelnih zahteva (nema rezervisanih sredstava)
        </Typography>
      </Box>
      {user?.reserved && user?.reserved > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            padding: 2,
            borderRadius: 2,
            marginTop: 3,
          }}
        >
          <Typography>Zahtev za isplatu je kreiran!</Typography>
          <Typography>
            Za isplatu <b>{user.reserved.toFixed(2)} RSD</b>
          </Typography>
          <Button
            size="large"
            sx={{
              backgroundColor: "#FFC211",
              textTransform: "none",
              width: "100%",
              color: "black",
              mt: 2,
            }}
            variant="contained"
            onClick={() => declinePaymentRequest()}
          >
            <b>Otkaži zahtev za isplatu</b>
          </Button>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
          <Stack gap={2} alignItems="center" marginTop={2}>
            <TextField
              required
              fullWidth
              color="warning"
              error={
                !!(formik.touched.paymentValue && formik.errors.paymentValue)
              }
              helperText={
                formik.touched.paymentValue && formik.errors.paymentValue
              }
              label="Za isplatu"
              name="paymentValue"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.paymentValue}
            />
            <TextField
              required
              fullWidth
              color="warning"
              error={
                !!(formik.touched.bankAccount && formik.errors.bankAccount)
              }
              helperText={
                formik.touched.bankAccount && formik.errors.bankAccount
              }
              label="Tekući račun"
              name="bankAccount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="string"
              value={formik.values.bankAccount}
            />
            <Button
              size="large"
              sx={{
                backgroundColor: "#FFC211",
                textTransform: "none",
                width: "100%",
                color: "black",
              }}
              variant="contained"
              type="submit"
            >
              <b>Isplati</b>
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default PayoutBankAccount;
