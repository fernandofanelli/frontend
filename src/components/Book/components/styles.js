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
    justifyContent: "center",
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    background: "#9f5ccc !important",
    border: "1px solid #9f5ccc !important",
    borderRadius: "4px !important",
    color: "white !important",
    height: "40px",
    "&:hover": {
      backgroundColor: "#873abb !important",
      border: "#873abb !important",
      boxShadow: "none",
    },
  },
  returnButton: {
    background: "#640e9d !important",
    border: "1px solid #640e9d !important",
    borderRadius: "4px !important",
    color: "white !important",
    width: "60%",
    height: "40px",
    "&:hover": {
      backgroundColor: "#38015c !important",
      border: "#38015c !important",
      boxShadow: "none",
    },
  },
  removeButton: {
    backgroundColor: "#3F1651 !important",
    border: "#3F1651 !important",
    color: "white !important",
    height: "40px",
    "&:hover": {
      background: "#c61a09 !important",
      border: "1px solid #c61a09 !important",
      boxShadow: "none",
    },
  },
}));
