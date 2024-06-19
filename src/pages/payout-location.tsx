import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { axiosClient } from "../utils/axios";
import { useFormik } from "formik";
import axios from "axios";
import { User } from "../types/user";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object().shape({
  payOutValue: yup
    .number()
    .required("Iznos za isplatu je obavezan")
    .min(500, "Minimalna vrednost isplate je 500"),
});

const PayoutLocation: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const [payoutResponse, setPayoutResponse] = useState<object>({});
  const [payoutLocations, setPayoutLocations] = useState<any[]>([]);
  const [payoutLocationCode, setPayoutLocationCode] = useState<string>("");

  console.log(payoutResponse);

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
        setUser(result.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPayoutLocation = async () => {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Auth-Token": localStorage.getItem(
            "__ibet-mobile/_ionickv/auth-token"
          ),
          Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
        };

        const response = await axios.get(
          "https://ibet2.365.rs/ibet/profile/locationsForWithdrawal.json?mobileVersion=2.32.10.5&locale=sr",
          {
            headers: headers,
          }
        );

        setPayoutLocations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayoutLocation();
  }, []);

  const handlePayoutLocationChange = (event: SelectChangeEvent) => {
    setPayoutLocationCode(event.target.value as string);
  };

  console.log("payoutLocations", payoutLocations);

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

  const formik = useFormik({
    initialValues: {
      payOutValue: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new URLSearchParams();
        formData.append("amount", values.payOutValue);
        formData.append("locationCode", payoutLocationCode);
        formData.append("wdType", "AGENT");
        // formData.append("bankAcc", "12133");
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
        // window.location.reload();

        setPayoutResponse(response.data);
      } catch (error) {
        console.error("Greška pri slanju podataka:", error);
      }
    },
  });

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
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
          <b>在支付点提款</b>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
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
      ) : // @ts-ignore
      payoutResponse?.code ? (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            border: "1px solid gray",
            borderRadius: 2,
            padding: 1,
          }}
        >
          <Typography>
            {
              // @ts-ignore
              payoutResponse?.msg
            }
          </Typography>
          <Typography>
            Kod za isplatu:
            <b>
              {" "}
              {
                // @ts-ignore
                payoutResponse?.code
              }
            </b>
          </Typography>
          <Typography>
            {
              // @ts-ignore
              payoutResponse?.delayMsg
            }
          </Typography>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
          <Stack gap={2} alignItems="center" marginTop={2}>
            <TextField
              required
              fullWidth
              color="warning"
              error={
                !!(formik.touched.payOutValue && formik.errors.payOutValue)
              }
              helperText={
                formik.touched.payOutValue && formik.errors.payOutValue
              }
              label="用于支付"
              name="payOutValue"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.payOutValue}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                color: "#4B5E78",
              }}
            >
              <Typography fontSize={12} sx={{ width: "32%" }}>
                <b>支付点位置</b>
              </Typography>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">选择</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payoutLocationCode}
                  label="Tip Dokumenta"
                  onChange={handlePayoutLocationChange}
                >
                  {payoutLocations.map((item) => {
                    return (
                      <MenuItem value={item.betLocationCode}>
                        {item.address}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
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
              <b>提款</b>
            </Button>
          </Stack>
        </form>
      )}
      <Box
        sx={{
          display: "flex",
          mt: 2,
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: "#FFBA33" }} />}
          >
            <Box>
              <Typography fontSize={12}>Planet Win 365</Typography>
              <Typography fontSize={12}>
                Vozda Karadjordja 64, Paracin
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.9441250412942!2d21.408967876796897!3d43.85698677109326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756be01bef32d1f%3A0x33c0b11e2806f830!2sPlanet%20Win%20365!5e0!3m2!1sen!2srs!4v1715608518301!5m2!1sen!2srs"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: "#FFBA33" }} />}
          >
            <Box>
              <Typography fontSize={12}>Planet Win 365</Typography>
              <Typography fontSize={12}>
                Knjeginje Milice 37/31, Jagodina
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.12769316115!2d21.26004517680204!3d43.97740877108853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756c50028e70765%3A0xb9ea024ac18642dc!2sPlanet%20Win%20365!5e0!3m2!1sen!2srs!4v1715608721437!5m2!1sen!2srs"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: "#FFBA33" }} />}
          >
            <Box>
              <Typography fontSize={12}>Planet Win 365</Typography>
              <Typography fontSize={12}>Kneza Milosa 48, Cuprija</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.60707561733!2d21.369917112365844!3d43.92610837096995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756bf44b4f27e2f%3A0x82a8cc6c8300964!2sKneza%20Milosa%2048%2C%20%C4%86uprija!5e0!3m2!1sen!2srs!4v1715608823219!5m2!1sen!2srs"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: "#FFBA33" }} />}
          >
            <Box>
              <Typography fontSize={12}>Planet Win 365</Typography>
              <Typography fontSize={12}>Kneza Lazara 49, Jagodina</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.9692014906873!2d21.255126676802178!3d43.98068647108849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756c46a9c332301%3A0xf1e63c37be4b0d19!2sKneza%20Lazara%2049%2C%20Jagodina!5e0!3m2!1sen!2srs!4v1715608909160!5m2!1sen!2srs"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: "#FFBA33" }} />}
          >
            <Box>
              <Typography fontSize={12}>Planet Win 365</Typography>
              <Typography fontSize={12}>Nusiceva 80, Jagodina</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.914133148906!2d21.25760651236825!3d43.981825270967924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756c440722c80ed%3A0x23c90ad0a9dc371f!2sNusiceva%2080%2C%20Jagodina%2035000!5e0!3m2!1sen!2srs!4v1715608984245!5m2!1sen!2srs"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PayoutLocation;
