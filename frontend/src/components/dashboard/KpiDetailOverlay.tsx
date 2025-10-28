import {
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { MarketingKpi } from '@/data/marketingKpiData';

interface KpiDetailOverlayProps {
  kpi: MarketingKpi | null;
  isOpen: boolean;
  onClose: () => void;
  isEmbedded?: boolean;
}

const KpiDetailOverlay: React.FC<KpiDetailOverlayProps> = ({
  kpi,
  isOpen,
  onClose,
  isEmbedded = false,
}) => {
  if (!isOpen || !kpi) return null;

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'above':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'at':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'below':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Prepare chart data
  const historicalData = kpi.sparkline.map((value, index) => ({
    day: `Day ${index + 1}`,
    value,
    forecast: kpi.trend.forecast[index] || value,
  }));

  const channelData = Object.entries(kpi.segments.channel).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const productData = Object.entries(kpi.segments.product).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isEmbedded) {
    return (
      <div className="kpi-overlay kpi-overlay--embedded">
        {/* Header */}
        <div className="kpi-overlay__header">
          <div className="kpi-overlay__title-section">
            <h2 className="kpi-overlay__title">{kpi.title}</h2>
            <p className="kpi-overlay__description">{kpi.description}</p>
          </div>
          <div className="kpi-overlay__actions">
            <button
              onClick={onClose}
              className="btn btn--ghost btn--sm kpi-overlay__close-btn"
              aria-label="Close KPI details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="kpi-overlay__content">
          {/* Key Metrics */}
          <div className="kpi-overlay__metrics">
            <div className="kpi-overlay__metric-card">
              <div className="kpi-overlay__metric-value">{kpi.value}</div>
              <div
                className={`kpi-overlay__metric-change kpi-overlay__metric-change--${kpi.changeType}`}
              >
                {kpi.change} from last period
              </div>
            </div>
            <div className="kpi-overlay__metric-card">
              <div className="kpi-overlay__metric-label">Trend</div>
              <div className="kpi-overlay__metric-trend">
                {getTrendIcon(kpi.trend.direction)}
                <span className="capitalize">
                  {kpi.trend.direction} ({kpi.trend.velocity})
                </span>
              </div>
            </div>
            <div className="kpi-overlay__metric-card">
              <div className="kpi-overlay__metric-label">Performance</div>
              <div
                className={`kpi-overlay__metric-performance ${getPerformanceColor(kpi.benchmark.performance)}`}
              >
                {kpi.benchmark.performance} target
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="kpi-overlay__charts">
            {/* Historical Trend - Enhanced with Area Chart */}
            <div className="kpi-overlay__chart-container kpi-overlay__chart-container--full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="kpi-overlay__chart-title">
                  Historical Trend & Forecast
                </h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-muted-foreground">Actual</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Forecast</span>
                  </div>
                </div>
              </div>
              <div className="kpi-overlay__chart kpi-overlay__chart--gradient">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563EB"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563EB"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorForecast"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="day"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2563EB"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                      dot={{ fill: '#2563EB', strokeWidth: 2, r: 5 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#colorForecast)"
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channel Breakdown - Enhanced */}
            <div className="kpi-overlay__chart-container">
              <h3 className="kpi-overlay__chart-title">
                Performance by Channel
              </h3>
              <div className="kpi-overlay__chart">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={channelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      type="number"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    />
                    <Bar dataKey="value" fill="#2563EB" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Distribution - Enhanced */}
            <div className="kpi-overlay__chart-container">
              <h3 className="kpi-overlay__chart-title">Product Distribution</h3>
              <div className="kpi-overlay__chart">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) =>
                        `${entry.name} ${(entry.percent * 100).toFixed(0)}%`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Insights and Recommendations - Enhanced */}
          <div className="kpi-overlay__insights">
            <div className="kpi-overlay__insights-section">
              <div className="kpi-overlay__insights-header">
                <h3 className="kpi-overlay__insights-title">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Key Insights
                </h3>
                <span className="text-xs text-muted-foreground">
                  {kpi.insights.length} insights
                </span>
              </div>
              <div className="kpi-overlay__insights-list-enhanced">
                {kpi.insights.map((insight, index) => (
                  <div key={index} className="kpi-overlay__insights-card">
                    <div className="kpi-overlay__insights-card-icon">
                      {kpi.trend.direction === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="kpi-overlay__insights-card-text">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="kpi-overlay__insights-section">
              <div className="kpi-overlay__insights-header">
                <h3 className="kpi-overlay__insights-title">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Recommendations
                </h3>
                <span className="text-xs text-muted-foreground">
                  {kpi.recommendations.length} actions
                </span>
              </div>
              <div className="kpi-overlay__insights-list-enhanced">
                {kpi.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="kpi-overlay__insights-card kpi-overlay__insights-card--recommendation"
                  >
                    <div className="kpi-overlay__insights-card-number">
                      {index + 1}
                    </div>
                    <p className="kpi-overlay__insights-card-text">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benchmarks */}
          <div className="kpi-overlay__benchmarks">
            <h3 className="kpi-overlay__benchmarks-title">Benchmarks</h3>
            <div className="kpi-overlay__benchmarks-grid">
              <div className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">
                  Industry Average
                </div>
                <div className="kpi-overlay__benchmark-value">
                  {kpi.benchmark.industry}%
                </div>
              </div>
              <div className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">Our Target</div>
                <div className="kpi-overlay__benchmark-value">
                  {kpi.benchmark.target}%
                </div>
              </div>
              <div className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">
                  Current Performance
                </div>
                <div
                  className={`kpi-overlay__benchmark-value ${getPerformanceColor(kpi.benchmark.performance)}`}
                >
                  {kpi.benchmark.performance} target
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="kpi-overlay">
        {/* Header */}
        <div className="kpi-overlay__header">
          <div className="kpi-overlay__title-section">
            <h2 className="kpi-overlay__title">{kpi.title}</h2>
            <p className="kpi-overlay__description">{kpi.description}</p>
          </div>
          <div className="kpi-overlay__actions">
            <button
              onClick={onClose}
              className="btn btn--ghost btn--sm kpi-overlay__close-btn"
              aria-label="Close KPI details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="kpi-overlay__content">
          {/* Key Metrics */}
          <div className="kpi-overlay__metrics">
            <div className="kpi-overlay__metric-card">
              <div className="kpi-overlay__metric-value">{kpi.value}</div>
              <div
                className={`kpi-overlay__metric-change kpi-overlay__metric-change--${kpi.changeType}`}
              >
                {kpi.change} from last period
              </div>
            </div>
            <div className="kpi-overlay__metric-card">
              <div className="kpi-overlay__metric-label">Trend</div>
              <div className="kpi-overlay__metric-trend">
                {getTrendIcon(kpi.trend.direction)}
                <span className="capitalize">
                  {kpi.trend.direction} ({kpi.trend.velocity})
                </span>
              </div>
            </div>
            <div className="kpi-overlay__metric-card">
              <div className="kpi-overlay__metric-label">Performance</div>
              <div
                className={`kpi-overlay__metric-performance ${getPerformanceColor(kpi.benchmark.performance)}`}
              >
                {kpi.benchmark.performance} target
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="kpi-overlay__charts">
            {/* Historical Trend - Enhanced with Area Chart */}
            <div className="kpi-overlay__chart-container kpi-overlay__chart-container--full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="kpi-overlay__chart-title">
                  Historical Trend & Forecast
                </h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-muted-foreground">Actual</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Forecast</span>
                  </div>
                </div>
              </div>
              <div className="kpi-overlay__chart kpi-overlay__chart--gradient">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563EB"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563EB"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorForecast"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="day"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2563EB"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                      dot={{ fill: '#2563EB', strokeWidth: 2, r: 5 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#colorForecast)"
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channel Breakdown - Enhanced */}
            <div className="kpi-overlay__chart-container">
              <h3 className="kpi-overlay__chart-title">
                Performance by Channel
              </h3>
              <div className="kpi-overlay__chart">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={channelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      type="number"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    />
                    <Bar dataKey="value" fill="#2563EB" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Distribution - Enhanced */}
            <div className="kpi-overlay__chart-container">
              <h3 className="kpi-overlay__chart-title">Product Distribution</h3>
              <div className="kpi-overlay__chart">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) =>
                        `${entry.name} ${(entry.percent * 100).toFixed(0)}%`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Insights and Recommendations - Enhanced */}
          <div className="kpi-overlay__insights">
            <div className="kpi-overlay__insights-section">
              <div className="kpi-overlay__insights-header">
                <h3 className="kpi-overlay__insights-title">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Key Insights
                </h3>
                <span className="text-xs text-muted-foreground">
                  {kpi.insights.length} insights
                </span>
              </div>
              <div className="kpi-overlay__insights-list-enhanced">
                {kpi.insights.map((insight, index) => (
                  <div key={index} className="kpi-overlay__insights-card">
                    <div className="kpi-overlay__insights-card-icon">
                      {kpi.trend.direction === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="kpi-overlay__insights-card-text">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="kpi-overlay__insights-section">
              <div className="kpi-overlay__insights-header">
                <h3 className="kpi-overlay__insights-title">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Recommendations
                </h3>
                <span className="text-xs text-muted-foreground">
                  {kpi.recommendations.length} actions
                </span>
              </div>
              <div className="kpi-overlay__insights-list-enhanced">
                {kpi.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="kpi-overlay__insights-card kpi-overlay__insights-card--recommendation"
                  >
                    <div className="kpi-overlay__insights-card-number">
                      {index + 1}
                    </div>
                    <p className="kpi-overlay__insights-card-text">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benchmarks */}
          <div className="kpi-overlay__benchmarks">
            <h3 className="kpi-overlay__benchmarks-title">Benchmarks</h3>
            <div className="kpi-overlay__benchmarks-grid">
              <div className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">
                  Industry Average
                </div>
                <div className="kpi-overlay__benchmark-value">
                  {kpi.benchmark.industry}%
                </div>
              </div>
              <div className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">Our Target</div>
                <div className="kpi-overlay__benchmark-value">
                  {kpi.benchmark.target}%
                </div>
              </div>
              <div className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">
                  Current Performance
                </div>
                <div
                  className={`kpi-overlay__benchmark-value ${getPerformanceColor(kpi.benchmark.performance)}`}
                >
                  {kpi.benchmark.performance} target
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiDetailOverlay;
