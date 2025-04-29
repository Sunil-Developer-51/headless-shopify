// src/components/Account.jsx
import React, { useEffect, useState } from "react";
import { getCustomerInfo } from "../api";
import '../style/AccountPage.css'; // Import CSS for styling

function Account() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchCustomerData(accessToken);
    }
  }, []);

  async function fetchCustomerData(accessToken) {
    const data = await getCustomerInfo(accessToken);
    setCustomer(data);
  }

  return (
    <div className="account-page">
      <div className="account-card">
        {customer ? (
          <div>
            <h2>Account Info</h2>
            <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <h3>Order History</h3>
            {customer.orders.edges.length > 0 ? (
              <ul>
                {customer.orders.edges.map(({ node }) => (
                  <li key={node.id} className="order-item">
                    <p>Order Number: {node.orderNumber}</p>
                    <p>Total: {node.totalPriceV2.amount} {node.totalPriceV2.currencyCode}</p>
                    <p>Date: {new Date(node.createdAt).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
