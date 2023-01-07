import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import SearchTable from "../Formation/Search";
import StatisCentre from "./elements/statisCentre";
import StatisCandidat from "./elements/statisCandidat";
import StatisBrevet from "./elements/statisBrevet";
export default function Statistics({ id }) {
  const [statis, setStatis] = useState("");

  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setStatis(json));
  }, [id]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={4} xs={12}>
            <StatisCentre statis={statis} />
          </Grid>
          <Grid item xl={4} lg={3} sm={6} xs={12}>
            <StatisCandidat statis={statis} />
          </Grid>
          <Grid item xl={4} lg={3} sm={6} xs={12}>
            <StatisBrevet statis={statis} />
          </Grid>
          <Grid item xs={12}>
            <SearchTable
              url={`${process.env.REACT_APP_API_URL}/api/Passing_List`}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
