import React, { useContext, useState, useEffect } from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/home.css";

// Function to format date in EST
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    timeZone: 'America/New_York', // Set time zone to Eastern Standard Time
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  return date.toLocaleDateString(undefined, options);
};

export const Transactions = () => {
  const { store, actions } = useContext(Context);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    actions.fetchUserTransactions().catch((error) => {
      console.error("Error fetching user transactions:", error);
    });
  }, []); // Empty dependency array to run once when component mounts

  const handleSelectTransaction = (transaction) => {
    console.log("Selected transaction:", transaction);
    setSelectedTransaction(transaction);
  };

  // Function to parse products string into JSON array
  const parseProducts = (products) => {
    try {
      return JSON.parse(products);
    } catch (error) {
      console.error("Error parsing products:", error);
      return [];
    }
  };


  return (
    <>
      <Navbar />
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={6}>
          <div className="mt-5" style={{ flex: 1, backgroundColor: "lightgray", padding: "20px", paddingTop: '50px' }}>
            <Typography variant="h2">Orders</Typography>
            {selectedTransaction ? (
              <div>
                <Typography variant="h5">Transaction ID: {selectedTransaction.id}</Typography>
                <Typography variant="h5">Date: {formatDate(selectedTransaction.created)}</Typography> {/* Format date using formatDate function */}
                <Typography variant="h5">Products:</Typography>
                <div>
                  {parseProducts(selectedTransaction.products).map((product, index) => (
                    <Typography key={index}>{product.name} - ${product.price.toFixed(2)}</Typography>
                  ))}
                </div>
                <Typography variant="h5" style={{ marginTop: '20px' }}>Total Price: ${selectedTransaction.total_price?.toFixed(2)}</Typography>
              </div>
            ) : (
              <Typography variant="body1">Select a transaction to view details</Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="mt-5" style={{ flex: 1, paddingTop: '50px' }}>
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
            <ListItemText primary={`Transaction ID: ${transaction.id} | ${formatDate(transaction.created)}`} secondary={`Total: $${transaction.total_price?.toFixed(2)}`} />
          </ListItem>
        ))
      ) : (
        <Typography variant="body1">No transactions found.</Typography>
      )}
    </List>
  );
};
