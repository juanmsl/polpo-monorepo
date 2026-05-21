import { useCallback, useState } from 'react';

import { ColumnData, Order, RowDataObject } from './smart-table.types';

export const useSort = <RowData extends RowDataObject>() => {
  const [[sortBy, order], setSortField] = useState<[ColumnData<RowData>['sortBy'] | null, Order | null]>([null, null]);

  const toggleSortField = useCallback((sortByField: ColumnData<RowData>['sortBy']) => {
    setSortField(([sortBy, order]) => {
      if (sortByField !== sortBy) {
        return [sortByField, 'asc'];
      }

      if (order === 'asc') {
        return [sortByField, 'desc'];
      }

      return [null, null];
    });
  }, []);

  return {
    sortBy,
    order,
    toggleSortField,
  };
};
