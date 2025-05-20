"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// const fixtypes = ["football", "rugby15", "rugby7", "hockey", "basketball"];

export function FixturesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [fixtureType, setFixtureType] = useState("football");

  // const [fixData, setFixData] = useState<AgentFixture[]>([]);

  console.log(data);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  });

  // useEffect(() => {
  //   if (data.length > 0) {
  //     const fixtures = data.filter(
  //       (fixture) => fixture.fixture_type === fixtureType
  //     );

  //     setFixData(fixtures);
  //   }
  // }, [data, fixtureType]);

  // console.log(fixData);

  return (
    <div>
      {/* <div>
        <Select
          value={
            (table.getColumn("fixture_type")?.getFilterValue() as string) ?? ""
          }
          onValueChange={(event) => {
            table.getColumn("fixture_type")?.setFilterValue(event.target.value);
          }}
        >
          <SelectTrigger>{"filter by fixture"}</SelectTrigger>
          <SelectContent>
            {fixtypes.map((fix, idx) => (
              <SelectItem key={idx} value={fix}>
                {fix}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <div className="flex items-center py-4 gap-4">
        {/* Filter for team1_name */}
        <Input
          placeholder="Filter home team..."
          value={
            (table.getColumn("team1_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("team1_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Filter for team2_name */}
        <Input
          placeholder="Filter away team..."
          value={
            (table.getColumn("team2_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("team2_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
