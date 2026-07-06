'use client';

import { SmartTable } from 'polpo/components';
import React, { useCallback, useMemo, useState } from 'react';

import { CreditForm, ExtraPaymentForm } from '@/components';
import { CreditResults } from '@/components/credit-results.component';
import { getColumns, getAmortizationTableData } from '@/helpers';
import { AmortizationFormData } from '@/types';

export default function Home() {
  const [{ propertyValue, periods, interest, initialPayment, monthlyPayment }, setFormData] =
    useState<AmortizationFormData>({
      propertyValue: 520000000,
      periods: 180,
      interest: 0.01,
      initialPayment: 180000000,
      monthlyPayment: 0,
    });

  const handleChange = useCallback((key: keyof AmortizationFormData, value: number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const { creditValue, monthlyFee, data, extraPayment } = useMemo(
    () =>
      getAmortizationTableData({
        periods,
        monthlyPayment,
        propertyValue,
        initialPayment,
        interest,
      }),
    [initialPayment, interest, monthlyPayment, periods, propertyValue],
  );

  return (
    <section className='calculator'>
      <CreditForm
        propertyValue={propertyValue}
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
