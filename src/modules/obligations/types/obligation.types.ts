export type ObligationCategory =
  | 'rent'
  | 'emi'
  | 'credit-card'
  | 'utility'
  | 'subscription'
  | 'other';

export type Obligation = {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  dueDate: string;
  category: ObligationCategory;
  notes: string;
  isPaid: boolean;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateObligationInput = {
  title: string;
  amount: number;
  dueDate: string;
  category?: ObligationCategory;
  notes?: string;
};

export type UpdateObligationInput = Partial<CreateObligationInput>;

export type MarkPaidResponse = {
  message: string;
  obligation: Obligation;
};
