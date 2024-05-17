import React from 'react';

const transactions = [
  {
    created: "Wed, 15 May 2024 00:00:00 GMT",
    id: 1,
    is_cash: true,
    products: "\"Signature Blend\", \"Harvest Moon\"",
    total_price: 13.54,
    user_id: 1
  },
  {
    created: "Tue, 14 May 2024 00:00:00 GMT",
    id: 2,
    is_cash: false,
    products: "\"Signature Blend\", \"Harvest Moon\"",
    total_price: 56.54,
    user_id: 1
  }
];

const TransactionList = () => {
  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id}>
          <p>Created: {transaction.created}</p>
          <p>Transaction ID: {transaction.id}</p>
          <p>Is Cash: {transaction.is_cash ? 'Yes' : 'No'}</p>
          <p>Products: {transaction.products}</p>
          <p>Total Price: ${transaction.total_price.toFixed(2)}</p>
          <p>User ID: {transaction.user_id}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
