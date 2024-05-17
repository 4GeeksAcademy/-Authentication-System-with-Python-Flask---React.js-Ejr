import React, { useContext } from "react";
import { Grid, Typography, } from "@mui/material";
import { Context } from "../store/appContext";
import {Navbar} from "../component/navbar"
import TransactionList from "../component/TransactionList";
import "../../styles/home.css";



export const Transactions = () => {
	const { store, actions } = useContext(Context);

  return (
<>
<Navbar />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="mt-5">
            <Typography variant="h1">Transactions:<div style={{ width: '100px', height: '100px', background: '#cfd8dc' }} />
            </Typography>
            <TransactionList />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="mt-5">
          </div>
        </Grid>
      </Grid>
</>
  );
};