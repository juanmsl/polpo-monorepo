import { ColumnData, Typography } from 'polpo/components';
import React from 'react';

import { MoneyFormat } from '@/helpers/formatters';
import { AmortizationFormData, RowData } from '@/types';

interface DataPointConstraints {
  interest: number;
  last: RowData;
  monthlyFee: number;
  monthlyPayment: number;
}

const getDataPoint = ({ interest, last, monthlyPayment, monthlyFee }: DataPointConstraints): RowData => {
  const newInterest = interest * last.balance;
  const fee = last.balance + newInterest + 1 >= monthlyFee ? monthlyFee : 0;
  const additional = Math.max(monthlyPayment - fee, 0);
  const calculatedAdditional = last.balance - fee + newInterest;
  const totalAdditional = calculatedAdditional > additional ? additional : calculatedAdditional;
  const capital = fee + totalAdditional - newInterest;

  return {
    period: last.period + 1,
    monthlyFee: fee,
    additional: totalAdditional,
    totalMonthlyPayment: fee + totalAdditional,
    interest: newInterest,
    capital,
    balance: last.balance - capital,
  };
};

export const getAmortizationTableData = ({
  periods,
  monthlyPayment,
  propertyValue,
  initialPayment,
  annualInterest,
}: AmortizationFormData) => {
  const interest = annualInterest / 1200;
  const creditValue = propertyValue - initialPayment;
  const monthlyFee = creditValue * (interest / (1 - Math.pow(1 + interest, -periods)));
  const extraPayment = Math.max(monthlyPayment - monthlyFee, 0);

  const data: Array<RowData> = [
    {
      period: 0,
      monthlyFee: 0,
      additional: 0,
      totalMonthlyPayment: 0,
      interest: 0,
      capital: 0,
      balance: creditValue,
    },
  ];
  const originalData = [...data];

  for (let i = 1; i <= periods; i++) {
    if (data[data.length - 1].balance > 0) {
      data.push(
        getDataPoint({
          last: data[data.length - 1],
          interest,
          monthlyFee,
          monthlyPayment,
        }),
      );
    }

    originalData.push(
      getDataPoint({
        last: originalData[originalData.length - 1],
        interest,
        monthlyFee,
        monthlyPayment: 0,
      }),
    );
  }

  return {
    data,
    originalData,
    creditValue,
    monthlyFee,
    extraPayment,
    interest,
  };
};

type GetCreditResultsParams = {
  monthlyFee: number;
  periods: number;
  creditValue: number;
  data: Array<RowData>;
};

export const getCreditResults = ({ monthlyFee, periods, creditValue, data }: GetCreditResultsParams) => {
  const payments = {
    noExtraPayment: {
      total: monthlyFee * periods,
      interest: monthlyFee * periods - creditValue,
    },
    extraPayment: {
      total: data.reduce((total, row) => total + row.totalMonthlyPayment, 0),
      interest: data.reduce((total, row) => total + row.interest, 0),
    },
  };

  return {
    ...payments,
    totalPaymentSavingsPercentage:
      ((payments.noExtraPayment.total - payments.extraPayment.total) / payments.noExtraPayment.total) * 100,
    timeSavingsPercentage: ((periods - data[data.length - 1].period) / periods) * 100,
  };
};

export const getSuggestedPayment = (monthlyFee: number, step: number) => {
  return Math.round((monthlyFee * (1 + 0.25 * step)) / 500000) * 500000;
};

// eslint-disable-next-line react/display-name
const renderMoney = (key: keyof RowData) => (rowData: RowData) => {
  // eslint-disable-next-line react/destructuring-assignment
  const value = rowData[key];

  // eslint-disable-next-line react/no-children-prop
  return React.createElement(
    Typography,
    {
      noPadding: true,
      nowrap: true,
      children: Math.round(value) ? MoneyFormat(value) : '-',
    },
    Math.round(value) ? MoneyFormat(value) : '-',
  );
};

export const getColumns = (showAdditionalPayment: boolean): Array<ColumnData<RowData>> => [
  { header: 'Periodo', field: 'period', sortBy: null },
  { header: 'Cuota', render: renderMoney('monthlyFee') },
  { header: 'Abono', render: renderMoney('additional'), hidden: !showAdditionalPayment },
  { header: 'Pago mensual', render: renderMoney('totalMonthlyPayment'), hidden: !showAdditionalPayment },
  { header: 'Intereses', render: renderMoney('interest') },
  { header: 'Capital', render: renderMoney('capital') },
  { header: 'Saldo', render: renderMoney('balance') },
];
