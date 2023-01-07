import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export default function StatisCandidat(props) {
  const sysDate = new Date();
  const Dte =
    sysDate.getDate() + "-" + sysDate.getMonth() + 1 + "-" + sysDate.getFullYear();

  const { nbr_total_candidat } = props.statis[0] || [];

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total candidat
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {nbr_total_candidat}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 70,
                width: 70,
              }}
            >
              <PeopleIcon />
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
