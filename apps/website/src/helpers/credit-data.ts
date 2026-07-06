import { ColumnData, Typography } from 'polpo/components';
import React from 'react';

import { MoneyFormat } from '@/helpers/formatters';
import { AmortizationFormData, RowData } from '@/types';

export const getAmortizationTableData = ({
  periods,
  monthlyPayment,
  propertyValue,
  initialPayment,
  interest,
}: AmortizationFormData) => {
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

  for (let i = 1; i <= periods && data[data.length - 1].balance > 0; i++) {
    const last = data[data.length - 1];

    const newInterest = interest * last.balance;
    const fee = last.balance + newInterest + 1 >= monthlyFee ? monthlyFee : 0;
    const additional = Math.max(monthlyPayment - fee, 0);
    const calculatedAdditional = last.balance - fee + newInterest;
    const totalAdditional = calculatedAdditional > additional ? additional : calculatedAdditional;
    const capital = fee + totalAdditional - newInterest;

    data.push({
      period: last.period + 1,
      monthlyFee: fee,
      additional: totalAdditional,
      totalMonthlyPayment: fee + totalAdditional,
      interest: newInterest,
      capital,
      balance: last.balance - capital,
    });
  }

  return {
    data,
    creditValue,
    monthlyFee,
    extraPayment,
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
    timeSavingsPercentage: ((periods - data.length) / periods) * 100,
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
