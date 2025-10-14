import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Configured Axios instance for API calls
 */
const api: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Dashboard API
export interface DashboardOverview {
  totalVisits: number;
  conversionRate: number;
  avgOrderValue: number;
  revenue: number;
  visitorsChange: number;
  conversionChange: number;
  revenueChange: number;
}

// Copilot API
export interface CopilotMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: string[];
}

export interface CopilotQuery {
  query: string;
  context?: string;
}

// Scenario Builder API
export interface ScenarioParameter {
  id: string;
  name: string;
  value: number;
  type: 'base' | 'change';
}

export interface Scenario {
  id: string;
  name: string;
  parameters: ScenarioParameter[];
  results?: ScenarioResult[];
  createdAt: Date;
}

export interface ScenarioResult {
  parameter: string;
  originalValue: number;
  newValue: number;
  impact: number;
  confidence: number;
}

// Data Sources API
export interface DataSource {
  id: string;
  name: string;
  type: 'csv' | 'google_analytics' | 'api';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  recordCount?: number;
}

// Alerts API
export interface Alert {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  isActive: boolean;
  lastTriggered?: Date;
  subscribers: string[];
}

// Reports API
export interface Report {
  id: string;
  name: string;
  type: 'dashboard' | 'scenario' | 'custom';
  status: 'generating' | 'completed' | 'failed';
  createdAt: Date;
  downloadUrl?: string;
}
