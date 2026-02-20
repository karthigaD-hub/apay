import axios from "axios";

const BASE = "http://localhost:5000/api/indusind";

export const quickQuote = (data) =>
  axios.post(`${BASE}/quick-quote`, data);

export const calculatePremium = (data) =>
  axios.post(`${BASE}/calculate-premium`, data);

export const createProposal = (data) =>
  axios.post(`${BASE}/create-proposal`, data);
