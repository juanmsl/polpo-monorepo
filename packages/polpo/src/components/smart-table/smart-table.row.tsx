import React from 'react';

import { useClassNames } from '../../hooks';

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
  const rowClassName = useClassNames({
    'row-selected': selectable && isSelected,
  });

  return <tr className={rowClassName}>{renderRow(data, columns, rowKey)}</tr>;
};
