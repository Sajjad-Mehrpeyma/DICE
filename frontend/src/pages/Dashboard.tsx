import React from 'react';
import { Users, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { ChartPlaceholder } from '@/components/widgets/ChartPlaceholder';
import { Loader } from '@/components/widgets/Loader';
import { useDashboardOverview } from '@/hooks/useDashboardOverview';

/**
 * Dashboard page component
 */
export const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading dashboard data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">
          Monitor your key performance indicators and business metrics
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIWidget
          title="Total Visits"
          value={dashboardData?.totalVisits.toLocaleString() || '0'}
          percentChange={dashboardData?.visitorsChange}
          icon={<Users className="h-6 w-6 text-primary-600" />}
        />

        <KPIWidget
          title="Conversion Rate"
          value={`${dashboardData?.conversionRate || 0}%`}
          percentChange={dashboardData?.conversionChange}
          icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
        />

        <KPIWidget
          title="Avg Order Value"
          value={`$${dashboardData?.avgOrderValue || 0}`}
          percentChange={dashboardData?.revenueChange}
          icon={<DollarSign className="h-6 w-6 text-primary-600" />}
        />

        <KPIWidget
          title="Revenue"
          value={`$${dashboardData?.revenue.toLocaleString() || '0'}`}
          percentChange={dashboardData?.revenueChange}
          icon={<ShoppingCart className="h-6 w-6 text-primary-600" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Revenue Trend"
          description="Monthly revenue over the last 12 months"
          height="h-80"
        />

        <ChartPlaceholder
          title="Traffic Sources"
          description="Distribution of traffic by source"
          height="h-80"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartPlaceholder
          title="Top Products"
          description="Best performing products this month"
          height="h-64"
        />

        <ChartPlaceholder
          title="Geographic Distribution"
          description="User distribution by country"
          height="h-64"
        />

        <ChartPlaceholder
          title="Device Analytics"
          description="Traffic breakdown by device type"
          height="h-64"
        />
      </div>
    </div>
  );
};
