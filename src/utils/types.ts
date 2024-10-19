export interface State<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  type: NotificationType;
  message: string;
  timestamp: number;
  href?: string;
}

export interface Log {
  id?: number;
  userId: number;
  domain: string;
  action: string;
  timestamp?: number;
}
