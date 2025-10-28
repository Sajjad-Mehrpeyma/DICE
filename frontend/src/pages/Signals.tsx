import { useState, useMemo } from 'react';
import { Search, Filter, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { signalData, Signal } from '@/data/signalData';
import { alertData, Alert } from '@/data/alertData';
import SignalCard from '@/components/signals/SignalCard';
import AlertCard from '@/components/signals/AlertCard';

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
  const [prioritizeQuery, setPrioritizeQuery] = useState('');

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

  const handlePrioritizeSignals = () => {
    if (prioritizeQuery.trim()) {
      console.log('prioritizeSignals', prioritizeQuery);
      // In a real app, this would call an API
      setPrioritizeQuery('');
    }
  };

  const handleAcknowledge = (id: number, type: 'signal' | 'alert') => {
    console.log('acknowledge', { id, type });
  };

  const handleExpand = (id: number, type: 'signal' | 'alert') => {
    console.log('expand', { id, type });
  };

  return (
    <div className="signals-page">
      <div className="signals-page__header">
        <h1 className="signals-page__title">Signals & Alerts</h1>
        <p className="signals-page__description">
          Monitor market signals, alerts, and insights to stay ahead of trends
          and issues.
        </p>
      </div>

      {/* Search and Action Bar */}
      <div className="signals-page__search-bar">
        <div className="signals-page__search-container">
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
          <div className="signals-page__action-buttons">
            <button
              onClick={handlePrioritizeSignals}
              className="btn btn--secondary signals-page__action-btn"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Prioritize
            </button>
            <button
              onClick={() => console.log('Personalize clicked')}
              className="btn btn--ghost signals-page__action-btn"
            >
              <Filter className="w-4 h-4 mr-2" />
              Personalize
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="signals-page__filters">
        <div className="signals-page__filter-section">
          <h3 className="signals-page__filter-title">Type</h3>
          <div className="signals-page__filter-options">
            <button
              className={`signals-page__filter-btn ${typeFilter === 'all' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              All
            </button>
            <button
              className={`signals-page__filter-btn ${typeFilter === 'signals' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setTypeFilter('signals')}
            >
              Signals
            </button>
            <button
              className={`signals-page__filter-btn ${typeFilter === 'alerts' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setTypeFilter('alerts')}
            >
              Alerts
            </button>
          </div>
        </div>

        <div className="signals-page__filter-section">
          <h3 className="signals-page__filter-title">Priority</h3>
          <div className="signals-page__filter-options">
            <button
              className={`signals-page__filter-btn ${priorityFilter === 'all' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setPriorityFilter('all')}
            >
              All
            </button>
            <button
              className={`signals-page__filter-btn signals-page__filter-btn--critical ${priorityFilter === 'Critical' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setPriorityFilter('Critical')}
            >
              Critical
            </button>
            <button
              className={`signals-page__filter-btn signals-page__filter-btn--high ${priorityFilter === 'High' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setPriorityFilter('High')}
            >
              High
            </button>
            <button
              className={`signals-page__filter-btn signals-page__filter-btn--medium ${priorityFilter === 'Medium' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setPriorityFilter('Medium')}
            >
              Medium
            </button>
            <button
              className={`signals-page__filter-btn signals-page__filter-btn--low ${priorityFilter === 'Low' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setPriorityFilter('Low')}
            >
              Low
            </button>
          </div>
        </div>

        <div className="signals-page__filter-section">
          <h3 className="signals-page__filter-title">Category</h3>
          <div className="signals-page__filter-options">
            <button
              className={`signals-page__filter-btn ${categoryFilter === 'all' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              All
            </button>
            <button
              className={`signals-page__filter-btn ${categoryFilter === 'market' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('market')}
            >
              Market
            </button>
            <button
              className={`signals-page__filter-btn ${categoryFilter === 'competitor' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('competitor')}
            >
              Competitor
            </button>
            <button
              className={`signals-page__filter-btn ${categoryFilter === 'regulatory' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('regulatory')}
            >
              Regulatory
            </button>
            <button
              className={`signals-page__filter-btn ${categoryFilter === 'technology' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('technology')}
            >
              Technology
            </button>
          </div>
        </div>

        <div className="signals-page__filter-section">
          <h3 className="signals-page__filter-title">Sort by</h3>
          <div className="signals-page__filter-options">
            <button
              className={`signals-page__filter-btn ${sortBy === 'timestamp' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setSortBy('timestamp')}
            >
              <Clock className="w-4 h-4 mr-1" />
              Time
            </button>
            <button
              className={`signals-page__filter-btn ${sortBy === 'priority' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setSortBy('priority')}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Priority
            </button>
            <button
              className={`signals-page__filter-btn ${sortBy === 'relevance' ? 'signals-page__filter-btn--active' : ''}`}
              onClick={() => setSortBy('relevance')}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Relevance
            </button>
          </div>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="signals-page__grid">
        {filteredItems.map(item => (
          <div key={`${item.type}-${item.id}`}>
            {item.type === 'signal' ? (
              <SignalCard
                signal={item as Signal}
                onAcknowledge={() => handleAcknowledge(item.id, 'signal')}
                onExpand={() => handleExpand(item.id, 'signal')}
                onOpenCopilot={() =>
                  console.log('Open copilot for signal', item.id)
                }
              />
            ) : (
              <AlertCard
                alert={item as Alert}
                onAcknowledge={() => handleAcknowledge(item.id, 'alert')}
                onExpand={() => handleExpand(item.id, 'alert')}
                onOpenCopilot={() =>
                  console.log('Open copilot for alert', item.id)
                }
              />
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="signals-page__empty">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
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
