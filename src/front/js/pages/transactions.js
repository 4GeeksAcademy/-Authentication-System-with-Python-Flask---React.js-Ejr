import React, { useContext, useState, useEffect } from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/home.css";

export const Transactions = () => {
  const { store, actions } = useContext(Context);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    let isMounted = true;
    actions.fetchUserTransactions().catch((error) => {
      if (isMounted) console.error("Error fetching user transactions:", error);
    });
    return () => {
      isMounted = false;
    };
  }, [actions]);

  const handleSelectTransaction = (transaction) => {
    console.log("Selected transaction:", transaction);
    setSelectedTransaction(transaction);
  };

  return (
    <>
      <Navbar />
      <Grid container spacing={2} style={{ marginTop: '10px' }}> {/* Adjust the marginTop value as needed */}
        <Grid item xs={6}>
          <div className="mt-5" style={{ flex: 1, backgroundColor: "lightgray", padding: "20px" }}>
            <Typography variant="h2">Order</Typography>
            {selectedTransaction ? (
              <div>
                <Typography variant="h5">Transaction ID: {selectedTransaction.id}</Typography>
                <Typography variant="h5">Date: {selectedTransaction.created}</Typography>
                <Typography variant="h5">Total Price: ${selectedTransaction.total_price?.toFixed(2)}</Typography>
                <ul>
                  {selectedTransaction.items?.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <Typography variant="body1">Select a transaction to view details</Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="mt-5" style={{ flex: 1 }}>
            <Typography variant="h2">Transactions</Typography>
            <TransactionList transactions={store.transactions} onSelectTransaction={handleSelectTransaction} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const TransactionList = ({ transactions, onSelectTransaction }) => {
  return (
    <List>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction) => (
          <ListItem button key={transaction.id} onClick={() => onSelectTransaction(transaction)}>
            <ListItemText primary={`Transaction ${transaction.id}`} secondary={`Total: $${transaction.total_price?.toFixed(2)}`} />
          </ListItem>
        ))
      ) : (
        <Typography variant="body1">No transactions found.</Typography>
      )}
    </List>
  );
};


