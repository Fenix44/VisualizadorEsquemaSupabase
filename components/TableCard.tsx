import React from 'react';
import { Table } from '../types';
import ColumnRow from './ColumnRow';
import { TableIcon, EyeIcon } from './Icons';

interface TableCardProps {
  table: Table;
  onViewData: (tableName: string) => void;
}

const TableCard: React.FC<TableCardProps> = ({ table, onViewData }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/10 flex flex-col">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
        <TableIcon className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-bold text-slate-100">{table.name}</h2>
      </div>
      <div className="divide-y divide-slate-700/50 flex-grow">
        {table.columns.map((column) => (
          <ColumnRow key={column.name} column={column} />
        ))}
      </div>
      <div className="p-3 bg-slate-800/70 border-t border-slate-700 flex justify-end">
        <button
          onClick={() => onViewData(table.name)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-300 bg-emerald-900/50 border border-emerald-700/50 rounded-md hover:bg-emerald-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          aria-label={`View data for ${table.name} table`}
        >
          <EyeIcon className="w-4 h-4" />
          View Data
        </button>
      </div>
    </div>
  );
};

export default TableCard;