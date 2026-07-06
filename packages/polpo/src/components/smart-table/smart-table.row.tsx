import React from 'react';

import { cn } from '../../helpers';

import { renderRow } from './smart-table.helpers';
import { ColumnData, RowDataObject } from './smart-table.types';

type SmartTableRowProps<RowData extends RowDataObject> = {
  data: RowData;
  columns: Array<ColumnData<RowData>>;
  isSelected: boolean;
  selectable: boolean;
  rowKey: React.Key;
};

export const SmartTableRow = <RowData extends RowDataObject>({
  data,
  columns,
  isSelected = false,
  selectable = false,
  rowKey,
}: SmartTableRowProps<RowData>) => {
  return <tr className={cn(selectable && isSelected && 'row-selected')}>{renderRow(data, columns, rowKey)}</tr>;
};
