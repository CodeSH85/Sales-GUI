
export interface TableColumns<T> {
	id: keyof T;
  accessorKey: keyof T;
  header: () => VNode;
  cell: ({ row }: { row: any }) => VNode;
	minSize: number,
}