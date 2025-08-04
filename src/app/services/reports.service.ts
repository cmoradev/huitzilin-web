import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly apiUri = `${environment.apiUri}/reports`;

  private readonly http = inject(HttpClient);

  public incomes(
    start: string,
    end: string,
    branchId: string
  ): Observable<ReportsResponse> {
    return this.http.get<ReportsResponse>(`${this.apiUri}/incomes`, {
      params: { start, end, branchId },
    });
  }
}

export interface ReportsStudent {
  id: string;
  fullname: string;
}

export interface ReportsData {
  paymentId: string;
  paymentFolio: number;
  paymentState: string;
  paymentMethod: string;
  paymentDate: string;
  paymentAmount: string;
  paymentTransaction: string;
  paymentBank: string;
  incomeId: string;
  incomeFolio: number;
  incomeState: string;
  incomeDate: string;
  incomeAmount: string;
  incomeDiscount: string;
  incomeSubtotal: string;
  incomeTaxes: string;
  incomeTotal: string;
  incomePendingPayment: string;
  branchId: string;
  branchName: string;
  students: ReportsStudent[];
}

export interface ReportsGrouped {
  id: string;
  name: string;
  count: string;
}

export interface ReportsResponse {
  groupedByMethod: ReportsGrouped[];
  total: number;
  data: ReportsData[];
}
