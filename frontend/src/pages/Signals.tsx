import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { signalData, Signal } from '@/data/signalData';
import { alertData, Alert } from '@/data/alertData';
import SignalCard from '@/components/signals/SignalCard';
import AlertCard from '@/components/signals/AlertCard';
import SignalDetailOverlay from '@/components/signals/SignalDetailOverlay';
import AlertDetailOverlay from '@/components/signals/AlertDetailOverlay';
import CopilotChatPane from '@/components/dashboard/CopilotChatPane';

type FilterType = 'all' | 'signals' | 'alerts';
type PriorityFilter = 'all' | 'Critical' | 'High' | 'Medium' | 'Low';
type CategoryFilter =
  | 'all'
  | 'market'
  | 'competitor'
  | 'regulatory'
  | 'technology'
  | 'economic'
  | 'social'
  | 'performance'
  | 'inventory'
  | 'budget'
  | 'security'
  | 'compliance'
  | 'system';

const Signals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'priority' | 'relevance'>(
    'timestamp',
  );

  // Detail view state
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotContext, setCopilotContext] = useState<string>('');

  const combinedItems = useMemo(() => {
    const signals = signalData.map(signal => ({
      ...signal,
      type: 'signal' as const,
    }));
    const alerts = alertData.map(alert => ({
      ...alert,
      type: 'alert' as const,
    }));
    return [...signals, ...alerts];
  }, []);

  const filteredItems = useMemo(() => {
    return combinedItems
      .filter(item => {
        const headline = item.type === 'signal' ? item.headline : '';
        const title = item.type === 'alert' ? item.title : '';
        const matchesSearch =
          searchQuery === '' ||
          headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType =
          typeFilter === 'all' || item.type === typeFilter + 's';

        const severity = item.type === 'alert' ? item.severity : undefined;
        const matchesPriority =
          priorityFilter === 'all' ||
          item.priority === priorityFilter ||
          severity === priorityFilter;

        const matchesCategory =
          categoryFilter === 'all' || item.category === categoryFilter;

        return (
          matchesSearch && matchesType && matchesPriority && matchesCategory
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'priority':
            const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
            const aPriority =
              priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
            const bPriority =
              priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
            return bPriority - aPriority;
          case 'relevance':
            const relevanceOrder = { High: 3, Medium: 2, Low: 1 };
            const aRel = a.type === 'signal' ? a.relevance : 'Low';
            const bRel = b.type === 'signal' ? b.relevance : 'Low';
            const aRelevance =
              relevanceOrder[aRel as keyof typeof relevanceOrder] || 0;
            const bRelevance =
              relevanceOrder[bRel as keyof typeof relevanceOrder] || 0;
            return bRelevance - aRelevance;
          case 'timestamp':
          default:
            return (
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
        }
      });
  }, [
    combinedItems,
    searchQuery,
    typeFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  ]);

  const handleSignalClick = (signal: Signal) => {
    setSelectedSignal(signal);
    setSelectedAlert(null);
    setIsCopilotOpen(true);
    setCopilotContext(
      `Analyze this market signal: ${signal.headline}. Impact: ${signal.impact}, Priority: ${signal.priority}`,
    );
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setSelectedSignal(null);
    setIsCopilotOpen(true);
    setCopilotContext(
      `Analyze this alert: ${alert.title}. Severity: ${alert.severity}, Status: ${alert.status}`,
    );
  };

  const handleCloseDetail = () => {
    setSelectedSignal(null);
    setSelectedAlert(null);
    setIsCopilotOpen(false);
  };

  const handleAcknowledgeSignal = () => {
    if (selectedSignal) {
      console.log('Acknowledge signal', selectedSignal.id);
      // Update the signal's acknowledged status
      setSelectedSignal({ ...selectedSignal, acknowledged: true });
    }
  };

  const handleAcknowledgeAlert = () => {
    if (selectedAlert) {
      console.log('Acknowledge alert', selectedAlert.id);
      // Update the alert's acknowledged status
      setSelectedAlert({ ...selectedAlert, acknowledged: true });
    }
  };

  const handleCopilotToggle = () => {
    setIsCopilotOpen(!isCopilotOpen);
  };

  // If a signal or alert is selected, show detail view
  if (selectedSignal || selectedAlert) {
    return (
      <div className="signals-page signals-page--detail-view">
        <div className="dashboard__kpi-detail-layout">
          {/* Detail Panel on Left */}
          <div className="dashboard__kpi-details">
            {selectedSignal && (
              <SignalDetailOverlay
                signal={selectedSignal}
                isOpen={true}
                onClose={handleCloseDetail}
                onAcknowledge={handleAcknowledgeSignal}
                isEmbedded={true}
              />
            )}
            {selectedAlert && (
              <AlertDetailOverlay
                alert={selectedAlert}
                isOpen={true}
                onClose={handleCloseDetail}
                onAcknowledge={handleAcknowledgeAlert}
                isEmbedded={true}
              />
            )}
          </div>

          {/* Copilot on Right */}
          <CopilotChatPane
            isOpen={true}
            onToggle={handleCopilotToggle}
            context={copilotContext}
            isEmbedded={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="signals-page">
      <div className="signals-page__header">
        <h1 className="signals-page__title">Signals & Alerts</h1>
        <p className="signals-page__description">
          Monitor market signals, alerts, and insights to stay ahead of trends
          and issues.
        </p>
      </div>

      {/* Search Bar */}
      <div className="signals-page__search-bar">
        <div className="signals-page__search-input-group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search signals and alerts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input signals-page__search-input pl-10"
          />
        </div>
      </div>

      {/* Compact Horizontal Filter Bar */}
      <div className="signals-page__filter-bar">
        {/* Type Filter */}
        <div className="signals-page__filter-dropdown">
          <label className="signals-page__filter-label">Type</label>
          <div className="signals-page__select-wrapper">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as FilterType)}
              className="signals-page__select"
            >
              <option value="all">All Types</option>
              <option value="signals">Signals Only</option>
              <option value="alerts">Alerts Only</option>
            </select>
            <ChevronDown className="signals-page__select-icon" />
          </div>
        </div>

        {/* Priority Filter */}
        <div className="signals-page__filter-dropdown">
          <label className="signals-page__filter-label">Priority</label>
          <div className="signals-page__select-wrapper">
            <select
              value={priorityFilter}
              onChange={e =>
                setPriorityFilter(e.target.value as PriorityFilter)
              }
              className="signals-page__select"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown className="signals-page__select-icon" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="signals-page__filter-dropdown">
          <label className="signals-page__filter-label">Category</label>
          <div className="signals-page__select-wrapper">
            <select
              value={categoryFilter}
              onChange={e =>
                setCategoryFilter(e.target.value as CategoryFilter)
              }
              className="signals-page__select"
            >
              <option value="all">All Categories</option>
              <option value="market">Market</option>
              <option value="competitor">Competitor</option>
              <option value="regulatory">Regulatory</option>
              <option value="technology">Technology</option>
              <option value="economic">Economic</option>
              <option value="social">Social</option>
              <option value="performance">Performance</option>
              <option value="inventory">Inventory</option>
              <option value="budget">Budget</option>
              <option value="security">Security</option>
              <option value="compliance">Compliance</option>
              <option value="system">System</option>
            </select>
            <ChevronDown className="signals-page__select-icon" />
          </div>
        </div>

        {/* Sort Filter */}
        <div className="signals-page__filter-dropdown">
          <label className="signals-page__filter-label">Sort By</label>
          <div className="signals-page__select-wrapper">
            <select
              value={sortBy}
              onChange={e =>
                setSortBy(
                  e.target.value as 'timestamp' | 'priority' | 'relevance',
                )
              }
              className="signals-page__select"
            >
              <option value="timestamp">Recent First</option>
              <option value="priority">Priority</option>
              <option value="relevance">Relevance</option>
            </select>
            <ChevronDown className="signals-page__select-icon" />
          </div>
        </div>

        {/* Results Count */}
        <div className="signals-page__results-count">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Single Column Grid */}
      <div className="signals-page__grid">
        {filteredItems.map(item => (
          <div key={`${item.type}-${item.id}`}>
            {item.type === 'signal' ? (
              <SignalCard
                signal={item as Signal}
                onClick={() => handleSignalClick(item as Signal)}
              />
            ) : (
              <AlertCard
                alert={item as Alert}
                onClick={() => handleAlertClick(item as Alert)}
              />
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="signals-page__empty">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No signals or alerts found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms to see more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default Signals;
