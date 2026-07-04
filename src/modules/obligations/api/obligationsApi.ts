import type {HttpClient} from '../../../core/network';
import type {
  CreateObligationInput,
  MarkPaidResponse,
  Obligation,
  UpdateObligationInput,
} from '../types';

export type ObligationsApi = {
  list(): Promise<Obligation[]>;
  getById(obligationId: string): Promise<Obligation>;
  create(input: CreateObligationInput): Promise<Obligation>;
  update(obligationId: string, input: UpdateObligationInput): Promise<Obligation>;
  markPaid(obligationId: string): Promise<MarkPaidResponse>;
};

export function createObligationsApi(httpClient: HttpClient): ObligationsApi {
  return {
    list: () => httpClient.get<Obligation[]>('/obligations'),
    getById: obligationId =>
      httpClient.get<Obligation>(`/obligations/${obligationId}`),
    create: input =>
      httpClient.post<Obligation, CreateObligationInput>(
        '/obligations',
        input,
      ),
    update: (obligationId, input) =>
      httpClient.put<Obligation, UpdateObligationInput>(
        `/obligations/${obligationId}`,
        input,
      ),
    markPaid: obligationId =>
      httpClient.post<MarkPaidResponse>(
        `/obligations/${obligationId}/mark-paid`,
      ),
  };
}
