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
          <div className="mt-5" style={{ flex: 1, backgroundColor: "lightgray", padding: "20px" }}>
            <Typography variant="h1">Transactions:
            </Typography>
            <div style={{ flex: 1, backgroundColor: "lightgray", padding: "20px" }} />
            
          </div>
        </Grid>
        <Grid item xs={6}> 
          <div className="mt-5" style={{flex:1}}>
            <Typography variant="h1"> Transaction History: </Typography>
            <TransactionList />
          </div>
        </Grid>
      </Grid>
</>
  );
};