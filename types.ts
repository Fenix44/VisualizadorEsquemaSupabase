
export interface Column {
  name: string;
  type: string;
  comment: string;
  isPrimaryKey?: boolean;
}

export interface Table {
  name: string;
  columns: Column[];
}
