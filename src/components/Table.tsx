"use client";
import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableContainer as TableContainerBase,
  TableHead as TableHeadBase,
  TableRow,
  TableSortLabel,
  Box,
  styled,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

export interface TableColumn {
  id: string;
  content: string;
  sortable?: boolean;
}

export interface TableRow {
  id: string;
  content: string;
  link?: string;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[][];
}

interface Props {
  tableTitle?: string;
  data: TableData;
}

type Order = "asc" | "desc";

function descendingComparator(
  a: TableRow[],
  b: TableRow[],
  orderBy: string
): number {
  const aCell = a.find((cell) => cell.id === orderBy)?.content ?? "";
  const bCell = b.find((cell) => cell.id === orderBy)?.content ?? "";

  if (bCell < aCell) {
    return -1;
  }
  if (bCell > aCell) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: Order,
  orderBy: string
): (a: TableRow[], b: TableRow[]) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface TableHeadProps {
  columns: TableColumn[];
  order: Order;
  orderBy: string;
  onSort: (event: React.MouseEvent<unknown>, property: string) => void;
}

const TableHead: React.FC<TableHeadProps> = ({
  columns,
  order,
  orderBy,
  onSort,
}) => {
  const handleSort =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onSort(event, property);
    };

  return (
    <TableHeadBase>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={handleSort(column.id as any)}
            >
              {column.content}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHeadBase>
  );
};

export const Table: React.FC<Props> = ({ tableTitle, data }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(data.columns[0].id);

  const handleSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = useMemo(
    () => [...data.rows].sort(getComparator(order, orderBy)),
    [order, orderBy]
  );

  return (
    <TableContainer>
      <TableBase aria-labelledby={tableTitle || "title"}>
        <TableHead
          columns={data.columns}
          order={order}
          orderBy={orderBy}
          onSort={handleSort}
        />
        <TableBody>
          {sortedRows.map((row, i) => (
            <TableRow key={`row-${i}`}>
              {row.map((cell, j) => (
                <TableCell key={`${cell.id}-${j}`}>
                  {cell.link ? (
                    <Link href={cell.link}>{cell.content}</Link>
                  ) : (
                    <>{cell.content}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableBase>
    </TableContainer>
  );
};

const TableContainer = styled(TableContainerBase)(({ theme }) => ({
  ".MuiTableCell-root": {
    ...theme.typography.body1,
  },
}));
