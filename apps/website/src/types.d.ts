export type RowData = {
  period: number;
  monthlyFee: number;
  additional: number;
  totalMonthlyPayment: number;
  interest: number;
  capital: number;
  balance: number;
};

export type AmortizationFormData = {
  propertyValue: number;
  periods: number;
  interest: number;
  initialPaymentPercentage: number;
  monthlyPayment: number;
};
