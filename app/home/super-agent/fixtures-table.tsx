"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function FixturesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});

  const updateReviewFixtures = useStore((state) => state.updateReviewFixtures);
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    // Enable global filtering for all columns
    globalFilterFn: "includesString",
    enableRowSelection: true,
  });

  const getSelectedFixtures = () => {
    return table.getSelectedRowModel().flatRows.map((row) => row.original);
  };

  // Example usage - you can call this wherever needed
  const handleSubmit = () => {
    const selectedFixtures = getSelectedFixtures();
    updateReviewFixtures(selectedFixtures as AgentFixture[]);
    // console.log("Selected fixtures:", selectedFixtures);
    router.push("/home/super-agent/review-data/trainees");
  };

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder="Search all columns..."
          className="max-w-sm"
        />

        <Button
          onClick={handleSubmit}
          disabled={Object.keys(rowSelection).length <= 0}
        >
          Review Selected
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
