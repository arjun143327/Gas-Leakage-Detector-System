import axios from 'axios';

const BASE = 'http://localhost:5000/api';

export const getReadings = () => axios.get(`${BASE}/readings`);
export const getAlerts   = () => axios.get(`${BASE}/alerts`);
