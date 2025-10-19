import { render, screen } from '@testing-library/react';
import ExecutiveSnapshotCard from '../ExecutiveSnapshotCard';
import { executiveSnapshotData } from '@/data/executive-snapshot';

describe('ExecutiveSnapshotCard', () => {
  it('renders the summary and confidence', () => {
    render(<ExecutiveSnapshotCard />);
    expect(screen.getByText(executiveSnapshotData.summary)).toBeInTheDocument();
    expect(
      screen.getByText(`${executiveSnapshotData.confidence}%`)
    ).toBeInTheDocument();
  });

  it('renders the KPIs', () => {
    render(<ExecutiveSnapshotCard />);
    executiveSnapshotData.kpis.forEach(kpi => {
      expect(screen.getByText(kpi.label)).toBeInTheDocument();
      expect(screen.getByText(kpi.value.toString())).toBeInTheDocument();
    });
  });
});
