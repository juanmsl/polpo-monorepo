import { SmartTable, Tabs } from 'polpo/components';

import { CreditChart } from '@/components/credit-chart';
import { EstimationsChart } from '@/components/estimations-chart';
import { InterestChart } from '@/components/interest-chart';
import { SellData } from '@/components/sell-data';
import { getColumns } from '@/helpers';
import { RowData } from '@/types';

enum CreditEstimationTabs {
  PAYMENTS_TABLE = 'payments_table',
  TIME_CHART = 'time_chart',
  INTEREST_CHART = 'interest_chart',
  COSTS_TABLE = 'costs_table',
  SELL_DATA = 'sell_data',
}

interface CreditEstimationsProps {
  data: Array<RowData>;
  originalData: Array<RowData>;
  creditValue: number;
  periods: number;
  monthlyFee: number;
  extraPayment: number;
  propertyValue: number;
}

export const CreditEstimations = ({
  data,
  originalData,
  extraPayment,
  creditValue,
  periods,
  monthlyFee,
  propertyValue,
}: CreditEstimationsProps) => {
  return (
    <section className='section-estimations'>
      <Tabs defaultOpenTab={CreditEstimationTabs.TIME_CHART}>
        <Tabs.TabList
          color='primary'
          variant='ghost'
          radius='full'
          className='grid-flow-row md:grid-flow-col'
          tabsClassName={isActive => (isActive ? 'font-bold' : 'font-bold text-gray-400')}
          tabs={[
            { id: CreditEstimationTabs.TIME_CHART, label: 'Tiempo' },
            { id: CreditEstimationTabs.INTEREST_CHART, label: 'Intereses' },
            { id: CreditEstimationTabs.PAYMENTS_TABLE, label: 'Tabla de amortización' },
            { id: CreditEstimationTabs.COSTS_TABLE, label: 'Costos totales', isHidden: !extraPayment },
            { id: CreditEstimationTabs.SELL_DATA, label: 'Gastos de venta' },
          ]}
        />

        <section>
          <Tabs.TabPanel id={CreditEstimationTabs.PAYMENTS_TABLE}>
            <section className='w-full h-200 overflow-auto'>
              <SmartTable
                rowId='period'
                columns={getColumns(!!extraPayment)}
                data={data}
                className='overflow-auto h-full border border-primary rounded-2xl'
                tableClassName='bg-white/50 backdrop-blur-xs'
              />
            </section>
          </Tabs.TabPanel>
          <Tabs.TabPanel id={CreditEstimationTabs.TIME_CHART}>
            <CreditChart
              data={data}
              originalData={originalData}
              creditValue={creditValue}
              periods={periods}
              monthlyFee={monthlyFee}
              extraPayment={extraPayment}
            />
          </Tabs.TabPanel>
          <Tabs.TabPanel id={CreditEstimationTabs.INTEREST_CHART}>
            <InterestChart
              monthlyFee={monthlyFee}
              data={data}
              creditValue={creditValue}
              extraPayment={extraPayment}
              periods={periods}
            />
          </Tabs.TabPanel>
          <Tabs.TabPanel id={CreditEstimationTabs.COSTS_TABLE}>
            <EstimationsChart
              extraPayment={extraPayment}
              monthlyFee={monthlyFee}
              data={data}
              creditValue={creditValue}
              periods={periods}
            />
          </Tabs.TabPanel>
          <Tabs.TabPanel id={CreditEstimationTabs.SELL_DATA}>
            <SellData propertyValue={propertyValue} creditValue={creditValue} />
          </Tabs.TabPanel>
        </section>
      </Tabs>
    </section>
  );
};
