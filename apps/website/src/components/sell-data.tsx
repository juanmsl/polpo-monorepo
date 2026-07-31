import { ColumnData, SmartTable } from 'polpo/components';
import { useMemo } from 'react';

import { MoneyFixedFormat } from '@/helpers';

interface CostRow {
  label: string;
  percentage: string;
  buyer: number;
  seller: number;
  receiver: string;
}

interface SellDataProps {
  propertyValue: number;
  creditValue: number;
}

export function SellData({ propertyValue, creditValue }: SellDataProps) {
  const notaria = useMemo<Array<CostRow>>(
    () => [
      {
        label: 'Registro notarial',
        percentage: '0.54% del valor total entre ambas partes',
        buyer: (0.54 / 200) * propertyValue,
        seller: (0.54 / 200) * propertyValue,
        receiver: 'A la notaría',
      },
      {
        label: 'Copias y documentos',
        percentage: 'Costo estimado variable',
        buyer: 300000,
        seller: 0,
        receiver: 'A la notaría',
      },
    ],
    [propertyValue],
  );

  const taxes = useMemo<Array<CostRow>>(
    () => [
      {
        label: 'Impuesto de beneficiencia',
        percentage: '1% del valor total',
        buyer: (1 / 100) * propertyValue,
        seller: 0,
        receiver: 'A la Gobernación',
      },
      {
        label: 'Impuesto de registro',
        percentage: '0.67% del valor total',
        buyer: (0.67 / 100) * propertyValue,
        seller: 0,
        receiver: 'Oficina de Instrumentos Públicos',
      },
      {
        label: 'Retención en la fuente',
        percentage: '1% del valor total',
        buyer: 0,
        seller: (1 / 100) * propertyValue,
        receiver: 'A la Notaría (para la DIAN)',
      },
    ],
    [propertyValue],
  );

  const credit = useMemo<Array<CostRow>>(
    () => [
      {
        label: 'Avaluo de propiedad (Perito)',
        percentage: '~0.1% del valor total',
        buyer: (0.1 / 100) * propertyValue,
        seller: 0,
        receiver: 'Al Banco de manera anticipada',
      },
      {
        label: 'Estudio de titulos (Abogado)',
        percentage: 'Valor variable entre 400.000 y 900.000',
        buyer: 900000,
        seller: 0,
        receiver: 'Al Banco de manera anticipada',
      },
      {
        label: 'Derechos notariales',
        percentage: '~0.30% del crédito',
        buyer: (0.3 / 100) * creditValue,
        seller: 0,
        receiver: 'A la Notaría',
      },
      {
        label: 'Registro de hipoteca (ORIP)',
        percentage: '~0.50% del crédito',
        buyer: (0.5 / 100) * creditValue,
        seller: 0,
        receiver: 'Oficina de Instrumentos Públicos',
      },
    ],
    [creditValue, propertyValue],
  );

  const columns: Array<ColumnData<CostRow>> = [
    {
      header: 'Concepto',
      render: row => <label className={row.label === 'TOTAL' ? 'font-bold' : ''}>{row.label}</label>,
    },
    { header: 'Cálculo', render: row => <label>{row.percentage}</label> },
    {
      header: 'Comprador',
      render: row => (
        <label className={row.label === 'TOTAL' ? 'font-bold' : ''}>
          {row.buyer > 0 ? MoneyFixedFormat(row.buyer) : '-'}
        </label>
      ),
    },
    {
      header: 'Vendedor',
      render: row => (
        <label className={row.label === 'TOTAL' ? 'font-bold' : ''}>
          {row.seller > 0 ? MoneyFixedFormat(row.seller) : '-'}
        </label>
      ),
    },
    { header: '¿A quién se le paga?', render: row => <label>{row.receiver}</label> },
  ];

  const data = [
    ...notaria,
    {
      label: 'IVA',
      percentage: '19% de los costos notariales',
      buyer: notaria.reduce((count, item) => count + item.buyer, 0) * (19 / 100),
      seller: notaria.reduce((count, item) => count + item.seller, 0) * (19 / 100),
      receiver: 'A la notaría',
    },
    ...taxes,
    ...credit,
  ];

  return (
    <section className='w-full grid gap-8'>
      <SmartTable
        rowId='label'
        className='border border-primary rounded-2xl'
        columns={columns}
        data={[
          ...data,
          {
            label: 'TOTAL',
            percentage: '',
            buyer: data.reduce((count, item) => count + item.buyer, 0),
            seller: data.reduce((count, item) => count + item.seller, 0),
            receiver: '',
          },
        ]}
      />
    </section>
  );
}
