import React from 'react';
import { Column } from '../types';
import { KeyIcon } from './Icons';

interface ColumnRowProps {
  column: Column;
}

const typeColorMap: { [key: string]: string } = {
  uuid: 'text-purple-400',
  string: 'text-green-400',
  text: 'text-green-400',
  varchar: 'text-green-400',
  timestamp: 'text-sky-400',
  timestamptz: 'text-sky-400',
  serial: 'text-amber-400',
  int: 'text-amber-400',
  int4: 'text-amber-400',
  int8: 'text-amber-400',
  boolean: 'text-rose-400',
  enum: 'text-cyan-400',
  jsonb: 'text-indigo-400',
  date: 'text-sky-400',
};

const ColumnRow: React.FC<ColumnRowProps> = ({ column }) => {
  const color = typeColorMap[column.type] || 'text-slate-400';

  return (
    <div className="p-3 grid grid-cols-3 gap-2 items-start hover:bg-slate-700/30">
      <div className="col-span-1 flex items-center gap-2 font-mono text-sm text-slate-200 truncate">
        {column.isPrimaryKey && <KeyIcon className="w-4 h-4 text-amber-400 flex-shrink-0" aria-label="Primary Key" />}
        <span className="truncate" title={column.name}>{column.name}</span>
      </div>
      <div className={`col-span-1 font-mono text-sm ${color} truncate`} title={column.type}>
        {column.type}
      </div>
      <div className="col-span-1 text-xs text-slate-500 truncate" title={column.comment}>
        {column.comment}
      </div>
    </div>
  );
};

export default ColumnRow;
