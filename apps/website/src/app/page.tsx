'use client';

import { SmartTable } from 'polpo/components';
import React, { useCallback, useMemo, useState } from 'react';

import { CreditEstimations, CreditForm, ExtraPaymentForm } from '@/components';
import { CreditResults } from '@/components/credit-results.component';
import { getColumns, getAmortizationTableData } from '@/helpers';
import { AmortizationFormData } from '@/types';

export default function Home() {
  const [{ propertyValue, periods, annualInterest, initialPayment, monthlyPayment }, setFormData] =
    useState<AmortizationFormData>({
      propertyValue: 520000000,
      periods: 180,
      annualInterest: 12.0,
      initialPayment: 180000000,
      monthlyPayment: 0,
    });

  const handleChange = useCallback((key: keyof AmortizationFormData, value: number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const { creditValue, interest, monthlyFee, data, originalData, extraPayment } = useMemo(
    () =>
      getAmortizationTableData({
        periods,
        monthlyPayment,
        propertyValue,
        initialPayment,
        annualInterest,
      }),
    [initialPayment, annualInterest, monthlyPayment, periods, propertyValue],
  );

  return (
    <section className='calculator'>
      <CreditForm
        propertyValue={propertyValue}
        periods={periods}
        annualInterest={annualInterest}
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
      <CreditEstimations
        data={data}
        extraPayment={extraPayment}
        originalData={originalData}
        creditValue={creditValue}
        propertyValue={propertyValue}
        periods={periods}
        monthlyFee={monthlyFee}
      />
      <SmartTable
        rowId='period'
        columns={getColumns(!!extraPayment)}
        data={data}
        className='table-container rounded-2xl border border-primary'
        tableClassName='table-background'
      />
    </section>
  );
}
