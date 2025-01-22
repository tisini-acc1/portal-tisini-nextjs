"use client";

// import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<WalletStatement>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Transaction",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date_created",
    header: "Date",
    // cell: ({ row }) => {
    //   const statement = row.original;

    //   return (
    //     <div>{format(new Date(statement.date_created), "d MMM, yyyy")}</div>
    //   );
    // },
  },

  {
    accessorKey: "credit_amount",
    header: "Credit",
    cell: ({ row }) => {
      const statement = row.original;

      return (
        <div
          className={cn(statement.credit_amount === "0" ? "" : "text-red-500")}
        >
          {statement.credit_amount === "0"
            ? statement.credit_amount
            : -statement.credit_amount}
        </div>
      );
    },
  },
  {
    accessorKey: "debit_amount",
    header: "Debit",
    cell: ({ row }) => {
      const statement = row.original;

      return (
        <div
          className={cn(statement.debit_amount === "0" ? "" : "text-green-500")}
        >
          {statement.debit_amount === "0"
            ? statement.debit_amount
            : +statement.debit_amount}
        </div>
      );
    },
  },
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },

  // {
  //   accessorKey: "actions",
  //   cell: ({ row }) => {
  //     const maintenance = row.original;
  //     console.log(maintenance);

  //     return (
  //       <div className="flex gap-2">
  //         <EditFixtureModal />
  //         <DeleteFixtureModal />
  //       </div>
  //     );
  //   },
  // },
];
