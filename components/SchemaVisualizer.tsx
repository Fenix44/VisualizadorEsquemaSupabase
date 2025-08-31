import React from 'react';
import { Table } from '../types';
import TableCard from './TableCard';

interface SchemaVisualizerProps {
  schema: Table[];
  onViewDataTable: (tableName: string) => void;
}

const SchemaVisualizer: React.FC<SchemaVisualizerProps> = ({ schema, onViewDataTable }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {schema.map((table) => (
        <TableCard key={table.name} table={table} onViewData={onViewDataTable} />
      ))}
    </div>
  );
};

export default SchemaVisualizer;