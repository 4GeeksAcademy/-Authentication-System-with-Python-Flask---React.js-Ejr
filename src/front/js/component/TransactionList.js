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

const TransactionList = ({ onSelectTransaction }) => {
  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id} onClick={() => onSelectTransaction(transaction)} style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <p>Created: {transaction.created}</p>
          <p>Transaction ID: {transaction.id}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
