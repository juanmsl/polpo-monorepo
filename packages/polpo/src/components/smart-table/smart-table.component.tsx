import { useMemo, useState } from 'react';

import { cn } from '../../helpers';
import { KeyValuesOf } from '../../types';
import { Checkbox } from '../form';

import { SmartTableColumn } from './smart-table.column';
import { sortData } from './smart-table.helpers';
import { useSort } from './smart-table.hooks';
import { SmartTableRow } from './smart-table.row';
import './smart-table.styles.css';
import { ColumnData, RowDataObject } from './smart-table.types';

type SmartTableProps<RowData extends RowDataObject> = {
  columns: Array<ColumnData<RowData>>;
  data: Array<RowData>;
  width?: 'scroll' | 'content';
  selectable?: boolean;
  rowId: KeyValuesOf<RowData, React.Key>;
  className?: string;
  tableClassName?: string;
};

export const SmartTable = <RowData extends RowDataObject>({
  columns: initialColumns,
  data,
  width,
  selectable = false,
  rowId,
  className = '',
  tableClassName = '',
}: SmartTableProps<RowData>) => {
  const [selected, setSelected] = useState<{ [key: string]: RowData }>({});

  const { sortBy, order, toggleSortField } = useSort<RowData>();

  const columns = useMemo(() => {
    let finalColumns = [...initialColumns];

    if (selectable) {
      finalColumns = [
        {
          header: `${Object.values(selected).length}`,
          render: (data, rowKey) => (
            <Checkbox
              name={`selected-${rowKey}`}
              value={`${rowKey}` in selected}
              setValue={isSelected => {
                setSelected(prev => {
                  const copy = { ...prev };

                  if (isSelected) {
                    copy[`${rowKey}`] = data;
                  } else {
                    delete copy[`${rowKey}`];
                  }

                  return copy;
                });
              }}
            />
          ),
        },
        ...finalColumns,
      ];
    }

    return finalColumns;
  }, [initialColumns, selectable, selected]);

  const rows = useMemo(() => sortData<RowData>(data, sortBy, order), [data, sortBy, order]);

  return (
    <section className={cn('polpo-smart-table-container', className)}>
      <table
        className={cn(
          'polpo-smart-table',
          tableClassName,
          width === 'content' && 'layout-fixed',
          width === 'scroll' && 'layout-scrollable',
        )}
      >
        <thead>
          <tr>
            {columns.map((column, key) => (
              <SmartTableColumn
                key={key}
                toggleSortField={toggleSortField}
                sortField={sortBy}
                orderField={order}
                {...column}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <SmartTableRow
              key={row[rowId] as React.Key}
              rowKey={row[rowId] as React.Key}
              data={row}
              columns={columns}
              isSelected={`${row[rowId] as React.Key}` in selected}
              selectable={selectable}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};
