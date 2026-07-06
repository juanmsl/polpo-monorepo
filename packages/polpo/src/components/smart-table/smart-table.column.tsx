import { useMemo } from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

import { cn } from '../../helpers';
import { Grid } from '../../layouts';
import { Ripple } from '../ripple';
import { Typography } from '../typography';

import { ColumnData, Order, RowDataObject } from './smart-table.types';

type SmartTableColumnProps<RowData extends RowDataObject> = ColumnData<RowData> & {
  toggleSortField: (field: ColumnData<RowData>['sortBy']) => void;
  sortField: ColumnData<RowData>['sortBy'] | null;
  orderField: Order | null;
};

export const SmartTableColumn = <RowData extends RowDataObject>({
  header,
  sortBy,
  icon: Icon,
  width,
  field,
  toggleSortField,
  sortField,
  orderField,
  hidden,
}: SmartTableColumnProps<RowData>) => {
  const sortByKey = sortBy !== undefined ? sortBy : field;

  const columnOnClick = sortByKey ? () => toggleSortField(sortByKey) : undefined;

  const sortIcon = useMemo(() => {
    if (!sortByKey) return null;

    return (
      <span className='sort-icon'>
        {Boolean(sortField) &&
          sortField === sortByKey &&
          (orderField === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />)}
      </span>
    );
  }, [sortByKey, sortField, orderField]);

  if (hidden) return null;

  return (
    <th style={{ width }} className={cn(sortByKey && 'sort-on-click')} onClick={columnOnClick}>
      <Grid flow='column' gap='0.5em' jc='space-between' ai='center'>
        {Icon ? <Icon /> : null}
        <Typography variant='label' noPadding>
          {header}
        </Typography>
        {sortIcon}
      </Grid>
      <Ripple color='var(--color-primary-700)' />
    </th>
  );
};
