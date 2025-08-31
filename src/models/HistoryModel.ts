export interface HistoryModel {
  userId: string;
  paymentId: string;
  oldStatus: string;
  newStatus: string;
  createdAt: CreatedAt;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}
