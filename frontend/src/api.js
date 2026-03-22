import axios from 'axios';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const getReadings = () => axios.get(`${BASE}/readings`);
export const getAlerts   = () => axios.get(`${BASE}/alerts`);
