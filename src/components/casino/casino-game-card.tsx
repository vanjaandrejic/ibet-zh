import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Card,
  CardActionArea,
  Grid,
  Modal,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { CasinoGame } from "../../types/casino/casino-full-types";
import CancelIcon from "@mui/icons-material/Cancel";
import NavigationContext from "../../store/navigation-context";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

interface CasinoGameCardProps {
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean,
    gameName?: string
  ) => Promise<void>;
  game: CasinoGame;
  setFilteredGames?: Dispatch<SetStateAction<CasinoGame[]>>;
  setSearch?: Dispatch<SetStateAction<string>>;
}

const CasinoGameCard: FC<CasinoGameCardProps> = ({
  handleOpenGame,
  game,
  setFilteredGames,
  setSearch,
}) => {
  console.log(game);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFavoriteGame, setIsFavoriteGame] = useState<boolean>(false);

  const { user, favoriteGames, setFavoriteGames } =
    useContext(NavigationContext);

  useEffect(() => {
    const isGameFav = JSON.stringify(favoriteGames).includes(String(game.gid));

    // console.log("isGameFav", isGameFav);

    setIsFavoriteGame(isGameFav);

    // setIsFavoriteGame(() => {

    // })
  }, [favoriteGames, game.gid]);

  const handleOpenModal = () => {
    if (user) {
      setModalOpen(true);
    } else {
      navigate("/account");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const convertStringFormat = (jsonString: string) => {
    try {
      // Parsiraj JSON string u objekat
      const obj = JSON.parse(jsonString);

      // Mapiraj parove ključ-vrednost u željeni format i spaj ih sa '@'
      const result = Object.entries(obj)
        .map(([key, value]) => `${key}$${value}`)
        .join("@");

      return result;
    } catch (error) {
      console.error("Greška pri konvertovanju stringa:", error);
      return null;
    }
  };

  const addGameToFavorites = async () => {
    try {
      let newFavoriteGames = { ...favoriteGames };
      // Provera da li je igra već omiljena
      if (isFavoriteGame) {
        // Ako je igra već omiljena, izbacujemo je iz favoriteGames
        // @ts-ignore
        delete newFavoriteGames[game.gid];
      } else {
        // Ako nije omiljena, dodajemo je
        newFavoriteGames = {
          ...favoriteGames,
          [game.gid]: game.provider,
        };
      }
      setFavoriteGames(newFavoriteGames);
      const authToken = localStorage.getItem(
        "__ibet-mobile/_ionickv/auth-token"
      );
      const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

      const response = await axios.post(
        `https://ibet2.365.rs/ibet/user/favoriteCasinoGames.html?casinoGames=${convertStringFormat(
          JSON.stringify(newFavoriteGames)
        )}&mobileVersion=2.31.7&locale=sr`,
        {}, // Empty request payload
        {
          headers: {
            "X-Auth-Token": authToken,
            Utkn: utkn,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Greška pri slanju podataka:", error);
    }
  };

  const getGameImage = (gameId: string | undefined) => {
    // console.log("gameId", gameId);
    const gameIdentity = gameId?.replace(/[^A-Z0-9]/gi, "");
    if (game.gameProducer) {
      const gameProducer = game.gameProducer.toLocaleLowerCase();
      const url = `https://ibet-365.com/content/slot-icons/${gameProducer}/${gameIdentity}.jpg`;
      return <img width={"100%"} height={"100%"} src={url} alt={game.gameId} />;
    } else {
      // Handle the case where game.gameProducer is null or undefined
      return null;
    }
  };

  const navigate = useNavigate();

  return (
    <Grid xs={4} sm={3} md={2} key={game.gameId} item>
      <Card
        sx={{
          borderRadius: 2,
          width: "100%",
          height: "auto",
          minWidth: 100,
          minHeight: 136,
          position: "relative",
          display: "flex",
          transition: " 0.3s",
          "&:hover": {
            marginTop: -0.4,
          },
        }}
      >
        {user ? (
          <IconButton
            sx={{
              position: "absolute",
              top: -6,
              right: -4,
              display: "inline",
              zIndex: 2,
            }}
            onClick={() => addGameToFavorites()}
          >
            {isFavoriteGame ? (
              <FavoriteIcon
                sx={{
                  color: "red",
                }}
              />
            ) : (
              <FavoriteBorderIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        ) : null}

        {/* <Typography>{game.gameName}</Typography> */}

        <CardActionArea onClick={handleOpenModal}>
          {getGameImage(game.gameId)}
        </CardActionArea>

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#08080F",
              borderRadius: 3,
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 2,
                paddingLeft: 1.5,
                paddingRight: 1.5,
                width: "100%",
              }}
            >
              <Typography fontSize={14} textAlign={"center"}>
                {game.gameName}
              </Typography>
              <IconButton
                size="small"
                sx={{
                  zIndex: 9999,
                  backgroundColor: "#FFC211",
                  color: "black",
                  border: "none",
                  padding: 0,
                  marginLeft: 1,
                }}
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>
            <Card
              sx={{
                borderRadius: 2,
                width: "60%",
                height: "auto",
                minWidth: 100,
                minHeight: 136,
                position: "relative",
                display: "flex",
              }}
            >
              <CardActionArea>{getGameImage(game.gameId)}</CardActionArea>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              {!game.demoAvailable ? null : (
                <Button
                  variant="contained"
                  sx={{ width: "100%", boxShadow: 3, mb: 1 }}
                  onClick={() => {
                    if (user) {
                      handleOpenGame(
                        game.gameId,
                        game.provider,
                        true,
                        game.gameName
                      );
                      setFilteredGames ? setFilteredGames([]) : null;
                      handleCloseModal();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setSearch ? setSearch("") : null;
                    } else {
                      navigate("/account");
                    }
                  }}
                >
                  <b>Igraj bez novca</b>
                </Button>
              )}
              <Button
                sx={{
                  boxShadow: 3,
                  width: "100%",
                  backgroundColor: "#FFC211",
                  color: "black",
                }}
                variant="contained"
                onClick={() => {
                  handleOpenGame(
                    game.gameId,
                    game.provider,
                    false,
                    game.gameName
                  );
                  handleCloseModal();
                  setFilteredGames ? setFilteredGames([]) : null;
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setSearch ? setSearch("") : null;
                }}
              >
                <b>Igraj za novac</b>
              </Button>
            </Box>
          </Box>
        </Modal>
      </Card>
    </Grid>
  );
};

export default CasinoGameCard;
