import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' 
  ? '/rms_assessment/api'
  : '/api';

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
