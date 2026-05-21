'use client';

import {
  Slider,
  SmartTable,
  Typography,
  ColumnData,
  InputNumber,
  Line,
  Tooltip,
  Switch,
  SlideCard,
  Button,
} from 'polpo/components';
import { Grid } from 'polpo/layouts';
import React, { useCallback, useMemo, useState } from 'react';
import { FaEquals, FaPlus } from 'react-icons/fa6';

const MoneyFormat = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

const PercentageFormat = (value: number) => {
  return `${value.toFixed(2)}%`;
};

type RowData = {
  period: number;
  monthlyFee: number;
  additional: number;
  totalMonthlyPayment: number;
  interest: number;
  capital: number;
  balance: number;
};

// eslint-disable-next-line react/display-name
const renderMoney = (key: keyof RowData) => (rowData: RowData) => {
  // eslint-disable-next-line react/destructuring-assignment
  const value = rowData[key];

  return (
    <Typography noPadding nowrap>
      {Math.round(value) ? MoneyFormat(value) : '-'}
    </Typography>
  );
};

const getColumns = (showAdditionalPayment: boolean): Array<ColumnData<RowData>> => [
  { header: 'Periodo', field: 'period', sortBy: null },
  { header: 'Cuota', render: renderMoney('monthlyFee') },
  { header: 'Abono', render: renderMoney('additional'), hidden: !showAdditionalPayment },
  { header: 'Pago mensual', render: renderMoney('totalMonthlyPayment'), hidden: !showAdditionalPayment },
  { header: 'Intereses', render: renderMoney('interest') },
  { header: 'Capital', render: renderMoney('capital') },
  { header: 'Saldo', render: renderMoney('balance') },
];

export default function Home() {
  const [propertyValue, setPropertyValue] = useState(500000000);
  const [periods, setPeriods] = useState(180);
  const [interest, setInterest] = useState(0.01);
  const [initialPaymentPercentage, setInitialPaymentPercentage] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [addAdditionalPayment, setAddAdditionalPayment] = useState(false);

  const initialPayment = useMemo(
    () => (propertyValue * initialPaymentPercentage) / 100,
    [initialPaymentPercentage, propertyValue],
  );

  const creditValue = useMemo(() => propertyValue - initialPayment, [initialPayment, propertyValue]);

  const monthlyFee = useMemo(() => {
    return creditValue * (interest / (1 - Math.pow(1 + interest, -periods)));
  }, [creditValue, interest, periods]);

  const data = useMemo(() => {
    const tableData: Array<RowData> = [
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

    for (let i = 1; i <= periods && tableData[tableData.length - 1].balance > 0; i++) {
      const last = tableData[tableData.length - 1];

      const newInterest = interest * last.balance;
      const fee = last.balance + newInterest >= monthlyFee ? monthlyFee : 0;
      const additional = Math.max(monthlyPayment - fee, 0);
      const calculatedAdditional = last.balance - fee + newInterest;
      const totalAdditional = calculatedAdditional > additional ? additional : calculatedAdditional;
      const capital = fee + totalAdditional - newInterest;

      tableData.push({
        period: last.period + 1,
        monthlyFee: fee,
        additional: totalAdditional,
        totalMonthlyPayment: fee + totalAdditional,
        interest: newInterest,
        capital,
        balance: last.balance - capital,
      });
    }

    return tableData;
  }, [creditValue, interest, monthlyFee, monthlyPayment, periods]);

  const stats = useMemo(() => {
    return {
      noExtraPayment: {
        total: monthlyFee * periods,
        interest: monthlyFee * periods - creditValue,
      },
      extraPayment: {
        total: data.reduce((total, row) => total + row.totalMonthlyPayment, 0),
        interest: data.reduce((total, row) => total + row.interest, 0),
      },
    };
  }, [creditValue, data, monthlyFee, periods]);

  const getTotalTime = useCallback((periods: number) => {
    const years = periods / 12;
    const months = periods % 12;
    const yearsText = `${years >= 1 ? `${Math.floor(years)} año${years >= 2 ? 's' : ''}` : ''}`;
    const monthsText = `${months !== 0 ? ` y ${months} mes${months >= 2 ? 'es' : ''}` : ''}`;

    return `${yearsText}${monthsText}`;
  }, []);

  const getSuggestedPayment = useCallback(
    (step: number) => {
      return Math.round((monthlyFee * (1 + 0.25 * step)) / 500000) * 500000;
    },
    [monthlyFee],
  );

  return (
    <section className='calculator-header'>
      <section className='main-section'>
        <section className='left-card'>
          <InputNumber
            name='propertyValue'
            variant='line'
            value={propertyValue}
            setValue={v => setPropertyValue(v)}
            label='Valor de la propiedad'
            decimalSeparator=','
            format={{
              locales: 'es-CO',
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }}
          />
          <Slider
            name='initial-payment'
            value={initialPaymentPercentage}
            setValue={setInitialPaymentPercentage}
            label='Porcentaje cuota inicial'
            min={0}
            max={100}
          />
          <Slider
            name='periods'
            value={periods}
            setValue={setPeriods}
            label='Plazo del credito (meses)'
            min={12}
            max={360}
          />
          <Slider
            name='interest'
            value={interest * 1200}
            setValue={v => setInterest(v / 1200)}
            label='Interes anual'
            min={5}
            max={20}
          />
        </section>
        <section className='right-card'>
          <Typography variant='label'>Credito</Typography>
          <Typography variant='header1' color='primary' noPadding>
            {MoneyFormat(creditValue)}
          </Typography>
          <section>
            <section
              className='credit-bar'
              style={{ '--credit-size': `${100 - initialPaymentPercentage}%` } as React.CSSProperties}
            />
            <Grid jc='space-between' flow='column' ai='center'>
              <Typography variant='label'>{initialPaymentPercentage}%</Typography>
              <Typography variant='label'>{MoneyFormat(propertyValue)}</Typography>
            </Grid>
          </section>
          <Grid flow='column' gap='1em' jc='start'>
            <Tooltip content={'Interes mensual'} position='bottom'>
              <section>
                <Typography variant='label' noPadding>
                  Interes
                </Typography>
                <Typography variant='body' weight='bold' noPadding>
                  {PercentageFormat(interest * 100)}
                </Typography>
              </section>
            </Tooltip>
            <Line orientation='vertical' />
            <Tooltip position='bottom' content={getTotalTime(periods)}>
              <section>
                <Typography variant='label' noPadding>
                  Meses
                </Typography>
                <Typography variant='body' weight='bold' noPadding>
                  {periods}
                </Typography>
              </section>
            </Tooltip>
            <Line orientation='vertical' />
            <section>
              <Typography variant='label' noPadding>
                Cuota mensual
              </Typography>
              <Typography variant='body' weight='bold' noPadding>
                {MoneyFormat(monthlyFee)}
              </Typography>
            </section>
          </Grid>
        </section>
      </section>
      <section className='second-section'>
        <Grid jc='space-between' flow='column' className='section-header'>
          <Typography noPadding>¿Quieres hacer abonos recurrentes a capital?</Typography>
          <Switch
            name='addAdditionalPayment'
            value={addAdditionalPayment}
            setValue={v => {
              setAddAdditionalPayment(v);
              setMonthlyPayment(v ? getSuggestedPayment(1) : 0);
            }}
            color='primary'
            leftLabel='No'
            rightLabel='¡Si!'
          />
        </Grid>
        <SlideCard isOpen={addAdditionalPayment}>
          <Grid gap='2em' className='section-content'>
            <section>
              <Typography noPadding>¿Cuanto quieres pagar en total, al mes?</Typography>
              <Typography variant='label' weight='bold' noPadding>
                (Sumando la cuota obligatoria + el abono que quieres hacer)
              </Typography>
            </section>
            <Grid gap='2em' ai='end' gtc='1fr auto'>
              <InputNumber
                label='Pago mensual total'
                name='monthly-payment'
                variant='line'
                value={monthlyPayment}
                setValue={v => setMonthlyPayment(v)}
                decimalSeparator=','
                format={{
                  locales: 'es-CO',
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
              />
              <Grid flow='column' gap='1em'>
                <Button
                  variant='flat'
                  color='primary'
                  forIcon
                  size='small'
                  onClick={() => setMonthlyPayment(getSuggestedPayment(1))}
                >
                  {MoneyFormat(getSuggestedPayment(1))}
                </Button>
                <Button
                  variant='flat'
                  color='primary'
                  forIcon
                  size='small'
                  onClick={() => setMonthlyPayment(getSuggestedPayment(2))}
                >
                  {MoneyFormat(getSuggestedPayment(2))}
                </Button>
                <Button
                  variant='flat'
                  color='primary'
                  forIcon
                  size='small'
                  onClick={() => setMonthlyPayment(getSuggestedPayment(3))}
                >
                  {MoneyFormat(getSuggestedPayment(3))}
                </Button>
                <Button
                  variant='flat'
                  color='primary'
                  forIcon
                  size='small'
                  onClick={() => setMonthlyPayment(getSuggestedPayment(5))}
                >
                  {MoneyFormat(getSuggestedPayment(5))}
                </Button>
              </Grid>
            </Grid>
            <Grid flow='column' gtc='180px auto 180px auto 180px' gap='4em' jc='center' pi='center'>
              <section>
                <Typography variant='label' noPadding>
                  Cuota mensual
                </Typography>
                <Typography variant='body' weight='bold' noPadding>
                  {MoneyFormat(monthlyFee)}
                </Typography>
              </section>
              <FaPlus />
              <section>
                <Typography variant='label' noPadding>
                  Abono
                </Typography>
                <Typography variant='body' weight='bold' noPadding>
                  {MoneyFormat(Math.max(monthlyPayment - monthlyFee, 0))}
                </Typography>
              </section>
              <FaEquals />
              <section>
                <Typography variant='label' noPadding>
                  Cuota + Abono
                </Typography>
                <Typography variant='body' weight='bold' noPadding>
                  {MoneyFormat(monthlyFee + Math.max(monthlyPayment - monthlyFee, 0))}
                </Typography>
              </section>
            </Grid>
          </Grid>
        </SlideCard>
      </section>
      <section className='third-section'>
        <Grid gap='1em'>
          <Typography variant='header4' noPadding color='primary'>
            Sin abono a capital
          </Typography>
          <section>
            <section>
              <Typography variant='label' noPadding>
                Pago total
              </Typography>
              <Typography variant='body' weight='bold' noPadding>
                {MoneyFormat(stats.noExtraPayment.total)}
              </Typography>
            </section>
            <section>
              <Typography variant='label' noPadding>
                Intereses
              </Typography>
              <Typography variant='body' weight='bold' noPadding>
                {MoneyFormat(stats.noExtraPayment.interest)}
              </Typography>
            </section>
          </section>
        </Grid>
        {Math.max(monthlyPayment - monthlyFee, 0) ? (
          <>
            <Line orientation='horizontal' />
            <Grid gap='1em'>
              <Typography variant='header4' noPadding color='primary'>
                Con abono a capital
              </Typography>
              <section>
                <section>
                  <Typography variant='label' noPadding>
                    Pago total
                  </Typography>
                  <Typography variant='body' weight='bold' noPadding>
                    {MoneyFormat(stats.extraPayment.total)}
                  </Typography>
                </section>
                <section>
                  <Typography variant='label' noPadding>
                    Intereses
                  </Typography>
                  <Typography variant='body' weight='bold' noPadding>
                    {MoneyFormat(stats.extraPayment.interest)}
                  </Typography>
                </section>
              </section>
            </Grid>
            <Line orientation='horizontal' />
            <section>
              <Typography variant='label' noPadding>
                Ahorro del
              </Typography>
              <Typography variant='header1' noPadding>
                {PercentageFormat(
                  ((stats.noExtraPayment.total - stats.extraPayment.total) / stats.noExtraPayment.total) * 100,
                )}
              </Typography>
              <Grid>
                <Typography variant='label'>
                  Pagando <b>{MoneyFormat(Math.max(monthlyPayment - monthlyFee, 0))}</b> extra mensualmente, terminarás
                  de pagar el crédito en <b>{getTotalTime(data.length)}</b>, en lugar de <b>{getTotalTime(periods)}</b>,
                  pagándolo un <b>{PercentageFormat(((periods - data.length) / periods) * 100)}</b> más rápido.
                </Typography>
              </Grid>
            </section>
          </>
        ) : null}
      </section>
      <SmartTable
        rowId='period'
        columns={getColumns(!!Math.max(monthlyPayment - monthlyFee, 0))}
        data={data}
        className='max-h-[600px] border-0 rounded-[2em] overflow-auto table-container'
        tableClassName='bg-white'
      />
    </section>
  );
}
