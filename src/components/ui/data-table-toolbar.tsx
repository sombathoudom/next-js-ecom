"use client";
import { CrossIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-facted-filter";
import { DataTableViewOptions } from "./data-table-column-toggle";
import { RefreshCcwIcon } from "lucide-react";

export type DataTableFilterOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type DataTableFilter = {
  columnId: string;
  title: string;
  options: DataTableFilterOption[];
};

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchKey?: string;
  filters?: DataTableFilter[];
  refresh?: () => void;
};

// export type DataTableToolbarProps<TData> = {
//   table: Table<TData>;
//   searchPlaceholder?: string;
//   searchKey?: string;
//   filters?: {
//     columnId: string;
//     title: string;
//     options: {
//       label: string;
//       value: string;
//       icon?: React.ComponentType<{ className?: string }>;
//     }[];
//   }[];
//   refresh?: () => void;
// };

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Filter...",
  searchKey,
  filters = [],
  refresh,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {searchKey ? (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : (
          <Input
            placeholder={searchPlaceholder}
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        <div className="flex gap-x-2">
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column) return null;
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            );
          })}
        </div>
        {isFiltered && (
          <Button
            variant="destructive"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            className="h-8 px-2 sm:px-3"
          >
            Reset
            <CrossIcon className="size-4" />
          </Button>
        )}

        {refresh && (
          <Button
            variant="outline"
            size={"icon"}
            className="mr-2"
            onClick={refresh}
          >
            <RefreshCcwIcon className="size-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
