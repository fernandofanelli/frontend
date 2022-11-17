import React from "react";
import { Grid, Typography } from "@mui/material";

const CustomGrid = ({ label, text }) => {
  return (
    <Grid item xs={6}>
      <Typography variant="h3">
        <em>
          <b>{label}:</b>
        </em>
        <em> {text} </em>
      </Typography>
    </Grid>
  );
};

export default CustomGrid;
