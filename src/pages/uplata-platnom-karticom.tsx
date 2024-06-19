import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import NavigationContext from "../store/navigation-context";

const CreditCardPayPage: FC = () => {
  const [paymentReqs, setPaymentReqs] = useState<any[]>([]);
  const [isNewCard, setIsNewCard] = useState<boolean>(true);
  const [saveCardForFutureUse, setSaveCardForFutureUse] =
    useState<boolean>(false);

  const [savedCards, setSavedCards] = useState<string[]>([]);
  const [usedSavedCard, setUsedSavedCard] = useState<string>("new");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { iParametars } = useContext(NavigationContext);

  const minAmount =
    // @ts-ignore
    iParametars?.parameterValueMap?.["IBET_MIN_EMS_REQUEST_AMOUNT"]?.value ?? 0;

  const validationSchema = yup.object().shape({
    paymentValue: yup
      .number()
      .required("Polje je obavezno")
      .min(
        minAmount,
        `Minimalna vrednost uplate je ${
          minAmount ? minAmount.toFixed(2) : 0
        } RSD`
      ),
  });

  // iParametars.parameterValueMap["BONUS_PARAMETERS"].value.split("#");

  // const [isRedirectModalOpen, setIsRedirectModalOpen] =
  //   useState<boolean>(false);

  // const [redirectUrl, setRedirectUrl] = useState<string>("");

  useEffect(() => {
    const fetchPaymentReqs = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");
        const headers = {
          "Content-Type": "application/json",
          "X-Auth-Token": authToken,
          Utkn: utkn,
        };
        const response = await axios.get(
          `https://ibet2.365.rs/ibet/tenfore/requests/all.json?mobileVersion=2.27.49&locale=sr`,
          {
            headers: headers,
          }
        );

        setPaymentReqs(response.data);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPaymentReqs();
  }, []);

  // useEffect(() => {
  //   console.log("usedSavedCard", usedSavedCard);
  // }, [usedSavedCard]);

  useEffect(() => {
    const fetchCardDisplayInfo = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");
        const headers = {
          "Content-Type": "application/json",
          "X-Auth-Token": authToken,
          Utkn: utkn,
        };
        const response = await axios.get(
          `
          https://ibet2.365.rs/ibet/tenfore/card/cardDisplay.json?mobileVersion=2.32.10.5&locale=sr`,
          {
            headers: headers,
          }
        );

        setSavedCards(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCardDisplayInfo();
  }, []);

  // console.log("paymentReqs", paymentReqs);
  const formik = useFormik({
    initialValues: {
      paymentValue: "",
      saveCardForFutureUse: saveCardForFutureUse,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

        const headers = {
          "Content-Type": "application/json",
          "X-Auth-Token": authToken,
          Utkn: utkn,
        };

        const url = `https://ibet2.365.rs/ibet/tenfore/payin.json?amount=${values.paymentValue}&saveCardForFutureUse=${saveCardForFutureUse}&useSavedCard=${isNewCard}&cardInfo=${usedSavedCard}&platform=mobile-app&mobileVersion=2.27.49&locale=sr`;

        const response = await axios.post(url, {}, { headers });

        // console.log(response.data.data.redirectUrl);
        window.open(response.data.data.redirectUrl);

        // setRedirectUrl(response.data.data.redirectUrl);

        // setIsRedirectModalOpen(true);

        // console.log(response.data);

        // Provera uspešnog odgovora i redirekcija korisnika
      } catch (error) {
        // console.error("Greška pri slanju podataka:", error);
        toast.error("Greška pri slanju podataka!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const navigate = useNavigate();

  // console.log(savedCards);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 800,
      }}
    >
      {/* <Modal
        open={isRedirectModalOpen}
        onClose={() => setIsRedirectModalOpen(false)}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            p: 2,
            mt: 10,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setIsRedirectModalOpen(false)}
            sx={{
              position: "absolute",
              color: "white",
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            src={redirectUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
      </Modal> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          mb: 2,
        }}
      >
        <Typography fontSize={16}>
          <b>通过支付卡支付</b>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "90%",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Typography
          fontSize={14}
          sx={{ cursor: "pointer" }}
          onClick={() =>
            window.open("https://promo.365.rs/placanje-karticom--sr/")
          }
        >
          <u>支付卡支付说明</u>
        </Typography>
        <Typography fontSize={14} sx={{ marginTop: 1 }}>
          最低支付金额为 <b>{minAmount.toFixed(2)} RSD</b>
        </Typography>
        <Typography fontSize={14} sx={{ marginTop: 1 }}>
          最高支付金额为 <b>220,000.00 RSD</b>
        </Typography>

        <Typography fontSize={12} sx={{ marginTop: 1 }}>
          订单信息：所有价格均含增值税，无额外费用
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
        <Stack gap={1} alignItems="center" marginTop={2}>
          <TextField
            fullWidth
            required
            color="warning"
            sx={{ mb: 1 }}
            error={
              !!(formik.touched.paymentValue && formik.errors.paymentValue)
            }
            helperText={
              formik.touched.paymentValue && formik.errors.paymentValue
            }
            label="支付金额"
            name="paymentValue"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.paymentValue}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              border: "1px solid #FFC211",
              borderRadius: 1.2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Checkbox
                name="newCard"
                value={isNewCard}
                onChange={(e) => {
                  setIsNewCard(!e.target.checked);

                  // // setTimeout(() => console.log(isNewCard), 10000};

                  // setTimeout(() => {
                  //   console.log(isNewCard);
                  // }, 1000);
                }}
                // checked={formik.values.termsAndConditions}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
              <Typography fontSize={13}>新卡</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                // border: "1px solid red",
              }}
            >
              <Typography fontSize={13}>记住此卡</Typography>
              <Checkbox
                name="rememberMe"
                value={saveCardForFutureUse}
                onChange={(e) => {
                  setSaveCardForFutureUse(e.target.checked);

                  // setTimeout(() => {
                  //   console.log(saveCardForFutureUse);
                  // }, 1000);
                }}
                // checked={formik.values.termsAndConditions}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFC211",
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {savedCards
              ? savedCards.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Checkbox
                        name="usedCard"
                        value={usedSavedCard}
                        onChange={() => {
                          setUsedSavedCard(item);

                          // setTimeout(() => {
                          //   console.log(saveCardForFutureUse);
                          // }, 1000);
                        }}
                        // checked={formik.values.termsAndConditions}
                        sx={{
                          "&.Mui-checked": {
                            color: "#FFC211",
                          },
                        }}
                      />
                      <Typography fontSize={14}>{item}</Typography>
                    </Box>
                  );
                })
              : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
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
            <Typography fontSize={14}>
              <u>我接受使用条款</u>
            </Typography>
          </Box>
          <Button
            disabled={isLoading}
            size="large"
            sx={{
              backgroundColor: "#FFC211",
              textTransform: "none",
              width: "100%",
              color: "black",
              height: 44,
            }}
            variant="contained"
            type="submit"
          >
            {isLoading ? <CircularProgress /> : <b>存款</b>}
          </Button>
        </Stack>
      </form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {paymentReqs.map((item) => {
          return (
            <Box
              key={item.uuid}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid gray",
                borderRadius: 2,
                width: "100%",
                padding: 0.5,
                margin: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography fontSize={14}>
                  {item.amount.toFixed(2)}RSD
                </Typography>
                <Typography fontSize={10}>{item.uuid}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography fontSize={14}>
                  {item.status === 1 ? "Na čekanju" : "neobradjeni status"}
                </Typography>
                <Typography fontSize={12}>{item.requestDate}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CreditCardPayPage;
