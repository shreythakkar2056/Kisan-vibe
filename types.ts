export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface AnalysisResult {
  disease: string;
  severity: string;
  trust_score: string;
  claim_eligible: boolean;
  reason: string;
  summary_for_speech: string;
  remedy: string;
  recommended_product: string;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: string;
}

export interface ClaimRecord {
  id: string;
  date: string;
  disease: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  lat: number;
}