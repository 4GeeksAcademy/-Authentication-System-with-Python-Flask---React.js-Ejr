import React, { useContext } from "react";
import { Grid, Typography, } from "@mui/material";
import { Context } from "../store/appContext";
import {Navbar} from "../component/navbar"
import TransactionList from "../component/TransactionList";
import "../../styles/home.css";



export const Transactions = () => {
	const { store, actions } = useContext(Context);
  const [SelectedTransaction, setSelectedTransaction] = useState(null);
  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);

  return (
<>
<Navbar />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="mt-5" style={{ flex: 1, backgroundColor: "lightgray", padding: "20px" }}>
            <Typography variant="h1">Transaction Details:</Typography>
            {selectedTransaction ? (
                            <div>
                                <Typography variant="h5">Transaction ID: {selectedTransaction.id}</Typography>
                                <Typography variant="h5">Date: {selectedTransaction.created}</Typography>
                                <Typography variant="h5">Total Price: ${selectedTransaction.total_price.toFixed(2)}</Typography>
                                <ul>
                                    {selectedTransaction.items.map((item, index) => (
                                        <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (<Typography variant="body1">Select a transaction to view details</Typography>
                      )}
                  </div>
              </Grid>
              <Grid item xs={6}>
                  <div className="mt-5" style={{ flex: 1 }}>
                      <Typography variant="h1">Transaction History:</Typography>
                      <TransactionList onSelectTransaction={handleSelectTransaction} />
                  </div>
              </Grid>
          </Grid>
      </>
  );
};