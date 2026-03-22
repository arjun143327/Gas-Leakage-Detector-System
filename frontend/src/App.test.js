import { render, screen } from '@testing-library/react';

jest.mock('./api', () => ({
  getReadings: jest.fn(),
  getAlerts: jest.fn(),
}));

import App from './App';
import * as api from './api';

test('renders gas monitor heading', async () => {
  api.getReadings.mockResolvedValue({ data: [] });
  api.getAlerts.mockResolvedValue({ data: [] });
  render(<App />);
  expect(await screen.findByText(/LPG gas leak monitor/i)).toBeInTheDocument();
});
