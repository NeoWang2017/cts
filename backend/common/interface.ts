export interface ApiResponse {
  success: boolean;
  status: number;
  data: any;
  message?: string;
  errorMessage?: string;
  error?: string;
}
