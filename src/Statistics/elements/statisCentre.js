import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

export default function StatisCentre(props) {
  const sysDate = new Date();
  const Dte =
    sysDate.getDate() + "-" + sysDate.getMonth() + "-" + sysDate.getFullYear();

  const { nbr_centre } = props.statis[0] || [];

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Nombre de centre
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {nbr_centre}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 70,
                width: 70,
              }}
            >
              <CorporateFareIcon />
            </Avatar>
          </Grid>
        </Grid>

        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "normal",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            dernier mise à jour :
          </Typography>
          <Typography
            sx={{
              mr: 1,
            }}
            color="textSecondary"
            variant="caption"
          >
            {Dte}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
