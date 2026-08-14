import { useCallback, useMemo, useState } from 'react';

import { CreditEstimations, CreditForm, CreditResults, ExtraPaymentForm } from '@/components';
import { getAmortizationTableData } from '@/helpers';
import { AmortizationFormData } from '@/types';

function App() {
  const [{ propertyValue, periods, annualInterest, initialPayment, monthlyPayment }, setFormData] =
    useState<AmortizationFormData>({
      propertyValue: 520_000_000,
      periods: 180,
      annualInterest: 12.0,
      initialPayment: 180_000_000,
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
    </section>
  );
}

export default App;
