'use client'
import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, CellChange, Column, Id, Row, DropPosition, DefaultCellTypes } from '@silevis/reactgrid';
import { RateCellTemplate, RateCell } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface ColumnReorderGridState {
  columns: Column[]
  rows: Row<DefaultCellTypes | FlagCell | RateCell>[]
}

export const ColumnReorderSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<ColumnReorderGridState>(() => ({
    columns: dataColumns(true, false),
    rows: dataRows(true),
  }))

  const handleChanges = (changes: CellChange[]) => {
    let newState = { ...state };
    changes.forEach((change: any) => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
    return true;
  }

  const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
  }

  const handleCanReorderColumns = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
    return true;
  }

  const handleCanReorderRows = (targetColumnId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
    const rowIndex = state.rows.findIndex((row) => row.rowId === targetColumnId);
    if (rowIndex === 0) return false;
    return true;
  }

  const handleColumnsReordered = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
    const to = state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
    const columnIdxs = columnIds.map((id: Id, idx: number) => state.columns.findIndex((c: Column) => c.columnId === id));
    setState({
      columns: reorderArray(state.columns, columnIdxs, to),
      rows: state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, columnIdxs, to) })),
    });
  }

  const handleRowsReordered = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
    const newState = { ...state };
    const to = state.rows.findIndex((row) => row.rowId === targetRowId);
    const ids = rowIds.map((id: Id) => state.rows.findIndex(r => r.rowId === id));
    setState({ ...newState, rows: reorderArray<Row<DefaultCellTypes | FlagCell | RateCell>>(state.rows, ids, to) });
  }

  return (
    <ReactGridContainer id="column-reorder-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        customCellTemplates={{
          'rate': new RateCellTemplate(),
          'flag': new FlagCellTemplate(),
        }}
        onCellsChanged={handleChanges}
        canReorderColumns={handleCanReorderColumns}
        canReorderRows={handleCanReorderRows}
        onColumnsReordered={handleColumnsReordered}
        onRowsReordered={handleRowsReordered}
        enableColumnSelection
        enableRowSelection
        enableRangeSelection
      />
    </ReactGridContainer>
  )
}
