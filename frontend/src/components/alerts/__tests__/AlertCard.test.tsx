import { render, screen } from '@testing-library/react';
import AlertCard from '../AlertCard';
import { alertsData } from '@/data/alerts';
import { MemoryRouter } from 'react-router-dom';

describe('AlertCard', () => {
  it('renders the alert title and score', () => {
    const alert = alertsData[0];
    render(
      <MemoryRouter>
        <AlertCard alert={alert} />
      </MemoryRouter>
    );
    expect(screen.getByText(alert.title)).toBeInTheDocument();
    expect(screen.getByText(`Score: ${alert.score}`)).toBeInTheDocument();
  });

  it('renders the confidence', () => {
    const alert = alertsData[0];
    render(
      <MemoryRouter>
        <AlertCard alert={alert} />
      </MemoryRouter>
    );
    expect(
      screen.getByText(`Confidence: ${alert.confidence}%`)
    ).toBeInTheDocument();
  });
});
