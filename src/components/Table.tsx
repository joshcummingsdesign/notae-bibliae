"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { visuallyHidden } from "@mui/utils";
import { ExpandMore } from "@mui/icons-material";
import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableContainer as TableContainerBase,
  TableHead as TableHeadBase,
  TableRow,
  TableSortLabel as TableSortLabelBase,
  Box,
  styled,
} from "@mui/material";

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

const formatYear = (year: string): number => {
  let y = year;
  if (year.toLowerCase().includes("biblical")) {
    y = "0";
  } else if (year.toLowerCase().includes("century")) {
    y = String(Number(year.replace(/(\d+).*/, "$1")) - 1) + "00";
  }
  return Number(y);
};

const descendingComparator = (
  a: TableRow[],
  b: TableRow[],
  orderBy: string
): number => {
  const aCell = a.find((cell) => cell.id === orderBy);
  let aContent: string | number = aCell?.content ?? "";
  if (aCell && aCell.id === "year") {
    aContent = formatYear(aCell.content);
  }

  const bCell = b.find((cell) => cell.id === orderBy);
  let bContent: string | number = bCell?.content ?? "";
  if (bCell && bCell.id === "year") {
    bContent = formatYear(bCell.content);
  }

  if (bContent < aContent) {
    return -1;
  }
  if (bContent > aContent) {
    return 1;
  }
  return 0;
};

const getComparator = (
  order: Order,
  orderBy: string
): ((a: TableRow[], b: TableRow[]) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

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
              IconComponent={ExpandMore}
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
    borderBottom: `1px solid ${theme.palette.brand.border}`,
  },
}));

const TableSortLabel = styled(TableSortLabelBase)({
  fontWeight: "bold",
});
