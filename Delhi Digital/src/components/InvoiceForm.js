import React, { useEffect, useState } from "react";
import { createInvoice, updateInvoice, getInvoices } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch invoice data to populate the form
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    const response = await getInvoices();
    const invoice = response.data.find((inv) => inv.id === parseInt(id));
    setFormData(invoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateInvoice(id, formData);
    } else {
      await createInvoice(formData);
    }
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Client Name"
        value={formData.clientName}
        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Pending">Pending</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default InvoiceForm;
