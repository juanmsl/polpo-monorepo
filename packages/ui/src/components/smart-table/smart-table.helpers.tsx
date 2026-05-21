import React from 'react';

import { Typography } from '../typography';

import { ColumnData, Order, Primitive, RowDataObject } from './smart-table.types';

const renderRowColumn = <RowData extends RowDataObject>(
  data: RowData,
  { field, render, Component }: ColumnData<RowData>,
  rowKey: React.Key,
): React.ReactNode => {
  if (field && data[field])
    return (
      <Typography noPadding nowrap>
        {data[field] as Primitive}
      </Typography>
    );

  if (render) return render(data, rowKey);

  if (Component) return <Component data={data} rowKey={rowKey} />;
};

export const renderRow = <RowData extends RowDataObject>(
  data: RowData,
  columns: Array<ColumnData<RowData>>,
  rowKey: React.Key,
) => columns.map((column, key) => (column.hidden ? null : <td key={key}>{renderRowColumn(data, column, rowKey)}</td>));

export const sortData = <RowData extends RowDataObject>(
  data: Array<RowData>,
  sortBy: ColumnData<RowData>['sortBy'] | null,
  order: Order | null,
) => {
  if (sortBy) {
    return data.toSorted((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (
        ['number', 'boolean', 'string'].includes(typeof fieldA) &&
        ['number', 'boolean', 'string'].includes(typeof fieldB)
      ) {
        if (fieldA === fieldB) return 0;

        if (order === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        }

        return fieldA > fieldB ? -1 : 1;
      }

      return 0;
    });
  }

  return data;
};
