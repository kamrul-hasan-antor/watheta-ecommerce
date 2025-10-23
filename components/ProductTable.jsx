/* @react-compiler-disable */
"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function ProductTable({ data }) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "productName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price ($)" },
      {
        accessorKey: "quantity",
        header: "Stock",
        cell: ({ row }) => <div className="h-4 w-4 bg-red-600" />,
      },
      {
        accessorKey: "active",
        header: "Active",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-white ${
              row.original.active === "true" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {row.original.active === "true" ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        accessorKey: "productImae",
        header: "Image",
        cell: ({ row }) => (
          <Image
            src={row.original.productImae}
            alt={row.original.productName}
            className="h-10 w-10 object-cover rounded"
            width={10}
            height={10}
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-xl border p-4 shadow-sm bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
