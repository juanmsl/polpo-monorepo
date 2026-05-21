'use client';

import { SmartTable } from 'polpo/components';
import React, { useCallback, useMemo, useState } from 'react';

import { CreditForm, ExtraPaymentForm } from '@/components';
import { CreditResults } from '@/components/credit-results.component';
import { getColumns, getAmortizationTableData } from '@/helpers';
import { AmortizationFormData } from '@/types';

export default function Home() {
  const [{ propertyValue, periods, interest, initialPaymentPercentage, monthlyPayment }, setFormData] =
    useState<AmortizationFormData>({
      propertyValue: 500000000,
      periods: 180,
      interest: 0.01,
      initialPaymentPercentage: 30,
      monthlyPayment: 0,
    });

  const handleChange = useCallback((key: keyof AmortizationFormData, value: number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const { creditValue, monthlyFee, data, initialPayment, extraPayment } = useMemo(
    () =>
      getAmortizationTableData({
        periods,
        monthlyPayment,
        propertyValue,
        initialPaymentPercentage,
        interest,
      }),
    [initialPaymentPercentage, interest, monthlyPayment, periods, propertyValue],
  );

  return (
    <section className='calculator'>
      <CreditForm
        propertyValue={propertyValue}
        initialPaymentPercentage={initialPaymentPercentage}
        periods={periods}
        interest={interest}
        creditValue={creditValue}
        monthlyFee={monthlyFee}
        initialPayment={initialPayment}
        onChange={handleChange}
      />
      <ExtraPaymentForm
        monthlyFee={monthlyFee}
        monthlyPayment={monthlyPayment}
        extraPayment={extraPayment}
        onChange={handleChange}
      />
      <CreditResults
        periods={periods}
        creditValue={creditValue}
        monthlyFee={monthlyFee}
        extraPayment={extraPayment}
        data={data}
      />
      <SmartTable
        rowId='period'
        columns={getColumns(!!extraPayment)}
        data={data}
        className='table-container'
        tableClassName='table-background'
      />
    </section>
  );
}
