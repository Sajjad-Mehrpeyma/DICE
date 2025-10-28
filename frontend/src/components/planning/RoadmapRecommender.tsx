import { useState } from 'react';
import { Search, Play, Clock, Users } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedDuration: string;
  resources: string[];
}

interface RoadmapRecommenderProps {
  onRecommend: (query: string) => void;
  roadmapItems: RoadmapItem[];
  onProcessItem: (itemId: string) => void;
}

const RoadmapRecommender: React.FC<RoadmapRecommenderProps> = ({
  onRecommend,
  roadmapItems,
  onProcessItem,
}) => {
  const [query, setQuery] = useState('');

  const handleRecommend = () => {
    if (query.trim()) {
      onRecommend(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRecommend();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="roadmap-recommender">
      <h2 className="roadmap-recommender__title">
        What if I want my company in X state?
      </h2>

      <div className="roadmap-recommender__input-section">
        <div className="roadmap-recommender__input-group">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe your desired company state or goals..."
            className="input roadmap-recommender__input"
          />
          <button
            onClick={handleRecommend}
            disabled={!query.trim()}
            className="btn btn--primary roadmap-recommender__button"
            aria-label="Recommend roadmap based on query"
          >
            <Search className="w-4 h-4 mr-1" />
            Recommend Roadmap
          </button>
        </div>
      </div>

      {roadmapItems.length > 0 && (
        <div className="roadmap-recommender__list">
          {roadmapItems.map(item => (
            <div key={item.id} className="roadmap-recommender__item">
              <div className="roadmap-recommender__item-header">
                <div className="roadmap-recommender__item-content">
                  <h3 className="roadmap-recommender__item-title">
                    {item.title}
                  </h3>
                  <p className="roadmap-recommender__item-description">
                    {item.description}
                  </p>

                  <div className="roadmap-recommender__item-meta">
                    <span
                      className={`roadmap-recommender__priority roadmap-recommender__priority--${item.priority.toLowerCase()}`}
                    >
                      {item.priority} Priority
                    </span>
                    <span className="roadmap-recommender__duration">
                      <Clock className="w-3 h-3" />
                      {item.estimatedDuration}
                    </span>
                    <span className="roadmap-recommender__teams">
                      <Users className="w-3 h-3" />
                      {item.resources.length} teams
                    </span>
                  </div>
                </div>

                <div className="roadmap-recommender__item-actions">
                  <button
                    onClick={() => onProcessItem(item.id)}
                    className="btn btn--primary btn--sm"
                    aria-label={`Process roadmap item: ${item.title}`}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Process
                  </button>
                </div>
              </div>

              <div className="roadmap-recommender__item-resources">
                <h4 className="roadmap-recommender__resources-title">
                  Required Resources:
                </h4>
                <div className="roadmap-recommender__resources-list">
                  {item.resources.map((resource, index) => (
                    <span
                      key={index}
                      className="roadmap-recommender__resource-tag"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {roadmapItems.length === 0 && query && (
        <div className="roadmap-recommender__empty">
          <div className="text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-2" />
            <p>No roadmap recommendations yet</p>
            <p className="text-sm">
              Click "Recommend Roadmap" to get AI-powered suggestions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapRecommender;
