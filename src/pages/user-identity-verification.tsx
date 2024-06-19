import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const UserIdentityVerificationPage: FC = () => {
  const [selectedFirstFile, setSelectedFirstFile] = useState<File | null>(null);
  const [selectedSecondFile, setSelectedSecondFile] = useState<File | null>(
    null
  );
  const [documentType, setDocumentType] = useState<string>("");
  const [firstImageUrl, setFirstImageUrl] = useState<string | null>(null);
  const [secondImageUrl, setSecondImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDocumentChange = (event: SelectChangeEvent) => {
    setDocumentType(event.target.value as string);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFirstFile(event.target.files[0]);
      setFirstImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSecondFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedSecondFile(event.target.files[0]);
      setSecondImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const getDocumentTypeId = (type: string) => {
    switch (type) {
      case "Lična karta":
        return "ID";
      case "Pasoš":
        return "P";
      case "Selfi":
        return "SF";
      case "Broj tekućeg računa":
        return "OT";
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (
      documentType === "Lična karta" &&
      selectedFirstFile &&
      selectedSecondFile
    ) {
      // Dodato: Čitanje oba fajla
      const reader1 = new FileReader();
      const reader2 = new FileReader();

      reader1.onload = async () => {
        const result1 = reader1.result;
        if (typeof result1 === "string") {
          const fileData1 = result1.split(",")[1];

          reader2.onload = async () => {
            const result2 = reader2.result;
            if (typeof result2 === "string") {
              const fileData2 = result2.split(",")[1];

              const combinedFileData = fileData1 + fileData2; // Kombinovanje fajlova
              const fileExtension = selectedFirstFile.name.split(".").pop();

              try {
                const response = await axios.post(
                  "https://ibet2.365.rs/ibet/profile/uploadVerificationDocument.html",
                  combinedFileData, // Slanje kombinovanog fajla
                  {
                    params: {
                      documentType: getDocumentTypeId(documentType),
                      mimeType: fileExtension,
                      uploadedAt: Date.now(),
                      mobileVersion: "2.32.10.5",
                      locale: "sr",
                    },
                    headers: {
                      "Content-Type": "application/json",
                      "X-Auth-Token": localStorage.getItem(
                        "__ibet-mobile/_ionickv/auth-token"
                      ),
                      Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
                    },
                  }
                );

                setSelectedFirstFile(null);
                setSelectedSecondFile(null); // Resetovanje drugog fajla
                setFirstImageUrl(null);
                setSecondImageUrl(null); // Resetovanje drugog URL-a
                setDocumentType("");

                toast.success(response.data.message);
              } catch (error) {
                console.error("Error while sending request:", error);
                toast.error("Zahtev nije dobar!");
              } finally {
                setIsLoading(false);
              }
            } else {
              console.error("Unsupported result type");
            }
          };

          reader2.readAsDataURL(selectedSecondFile);
        } else {
          console.error("Unsupported result type");
        }
      };

      reader1.readAsDataURL(selectedFirstFile);
    } else if (selectedFirstFile) {
      // Originalni kod za slanje jednog fajla
      const reader = new FileReader();

      reader.onload = async () => {
        const result = reader.result;
        if (typeof result === "string") {
          const fileData = result.split(",")[1];
          const fileExtension = selectedFirstFile.name.split(".").pop();

          try {
            const response = await axios.post(
              "https://ibet2.365.rs/ibet/profile/uploadVerificationDocument.html",
              fileData, // directly sending fileData as payload
              {
                params: {
                  documentType: getDocumentTypeId(documentType),
                  mimeType: fileExtension,
                  uploadedAt: Date.now(),
                  mobileVersion: "2.32.10.5",
                  locale: "sr",
                },
                headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": localStorage.getItem(
                    "__ibet-mobile/_ionickv/auth-token"
                  ),
                  Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
                },
              }
            );
            // console.log(response.data);
            setSelectedFirstFile(null);

            setFirstImageUrl(null);

            setDocumentType("");

            toast.success(response.data.message);
          } catch (error) {
            console.error("Error while sending request:", error);
            toast.error("Zahtev nije dobar!");
          } finally {
            setIsLoading(false);
          }
        } else {
          console.error("Unsupported result type");
        }
      };

      reader.readAsDataURL(selectedFirstFile);
    } else {
      console.error("No file selected");
    }
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        maxWidth: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          mb: 2,
        }}
      >
        <Typography fontSize={18}>
          <b>Potvrda Identiteta</b>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box mt={1} mb={2} width={"80%"}>
        <Typography>
          Da bismo proverli Vaš identitet, potrebno je da dodate u aplikaciji
          fotografiju vašeg ličnog dokumenta.
        </Typography>

        <Typography mt={1}>
          Kliknite ili dodajte dokument kako bi započeli proces prenosa.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "80%",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tip Dokumenta</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={documentType}
            label="Tip Dokumenta"
            onChange={handleDocumentChange}
          >
            <MenuItem value={"Lična karta"}>Lična karta</MenuItem>
            <MenuItem value={"Pasoš"}>Pasoš</MenuItem>
            <MenuItem value={"Selfi"}>Selfi</MenuItem>
            <MenuItem value={"Broj tekućeg računa"}>
              Broj tekućeg računa
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {documentType !== "" ? (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ margin: 2, width: "80%" }}
        >
          {documentType === "Lična karta"
            ? "Dodaj Prednju Stranu"
            : "Dodaj dokument"}

          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Button>
      ) : null}
      {documentType === "Lična karta" && ( // Dodato: drugi dugme za dodavanje fajla
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ width: "80%", mb: 3 }}
        >
          Dodaj Zadnju Stranu
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleSecondFileChange}
          />
        </Button>
      )}

      {firstImageUrl && (
        <Box
          sx={{
            mb: "4%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setFirstImageUrl(null)}>
            <CloseIcon />
          </IconButton>
          <img
            src={firstImageUrl}
            alt="Prva slika"
            style={{ width: "140px", height: "auto" }}
          />
        </Box>
      )}

      {secondImageUrl && (
        <Box
          sx={{
            mb: "4%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setSecondImageUrl(null)}>
            <CloseIcon />
          </IconButton>
          <img
            src={secondImageUrl}
            alt="Druga slika"
            style={{ width: "140px", height: "auto", marginBottom: "4%" }}
          />
        </Box>
      )}

      <Button
        disabled={!selectedFirstFile || isLoading}
        variant="contained"
        onClick={handleSubmit}
        sx={{
          width: "80%",
          backgroundColor: "#FFC211",
          color: "black",
          height: "42px",
          mt: 2,
          mb: 8,
        }}
      >
        {isLoading ? <CircularProgress /> : <b>Pošalji</b>}
      </Button>
    </Box>
  );
};

export default UserIdentityVerificationPage;
