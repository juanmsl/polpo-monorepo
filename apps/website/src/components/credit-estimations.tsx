import { Tabs } from 'polpo/components';

import { CreditChart } from '@/components/credit-chart';
import { EstimationsChart } from '@/components/estimations-chart';
import { InterestChart } from '@/components/interest-chart';
import { SellData } from '@/components/sell-data';
import { RowData } from '@/types';

enum CreditEstimationTabs {
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
          tabsClassName={isActive => (isActive ? 'font-bold' : 'font-bold text-gray-400')}
          tabs={[
            { id: CreditEstimationTabs.TIME_CHART, label: 'Tiempo' },
            { id: CreditEstimationTabs.INTEREST_CHART, label: 'Intereses' },
            { id: CreditEstimationTabs.COSTS_TABLE, label: 'Costos totales' },
            { id: CreditEstimationTabs.SELL_DATA, label: 'Gastos de venta' },
          ]}
        />

        <section>
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
              originalData={originalData}
              creditValue={creditValue}
              extraPayment={extraPayment}
              periods={periods}
            />
          </Tabs.TabPanel>
          <Tabs.TabPanel id={CreditEstimationTabs.COSTS_TABLE}>
            <EstimationsChart
              originalData={originalData}
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
