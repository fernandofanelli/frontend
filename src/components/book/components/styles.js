import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    marginTop: "15px",
    marginLeft: "15%",
    maxWidth: "70%",
    background: "linear-gradient(45deg, #D9D9D9 30%, #E6E6E6 90%)",
  },
  media: {
    height: 0,
    paddingTop: "100%",
    marginTop: "15px",
    marginLeft: "15%",
    marginRight: "15%",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#2a344a",
      boxShadow: "none",
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    background: "#1C2331",
    color: "white",
    width: "100%",
    height: "40px",
    "&:hover": {
      backgroundColor: "#2a344a",
      boxShadow: "none",
    },
  },
}));
