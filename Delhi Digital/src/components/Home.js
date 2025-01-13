import React, { useEffect, useState } from "react";
import { getInvoices, deleteInvoice } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const response = await getInvoices();
    setInvoices(response.data);
  };

  const handleDelete = async (id) => {
    await deleteInvoice(id);
    fetchInvoices();
  };

  return (
    <div>
      <h2>Invoices</h2>
      <button onClick={() => navigate("/invoice-form")}>Add Invoice</button>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.clientName} - {invoice.amount} - {invoice.status}
            <button onClick={() => navigate(`/invoice-form/${invoice.id}`)}>Edit</button>
            <button onClick={() => handleDelete(invoice.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
