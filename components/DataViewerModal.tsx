import React from 'react';
import { Table } from '../types';
import { CloseIcon, WarningIcon } from './Icons';

interface DataViewerModalProps {
  table: Table;
  data: any[] | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const DataViewerModal: React.FC<DataViewerModalProps> = ({ table, data, isLoading, error, onClose }) => {
  const renderCellContent = (value: any) => {
    if (value === null) {
      return <span className="text-slate-500 italic">null</span>;
    }
    if (typeof value === 'boolean') {
      return <span className={value ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>{String(value)}</span>;
    }
    if (typeof value === 'object') {
      return <pre className="text-xs bg-slate-900 p-1 rounded overflow-x-auto"><code>{JSON.stringify(value, null, 2)}</code></pre>;
    }
    return String(value);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
        </div>
      );
    }
    if (error) {
      return (
        <div role="alert" className="m-4 bg-red-900/30 border border-red-500/50 text-red-300 text-sm rounded-md p-4 flex items-start gap-3">
          <WarningIcon className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">Error Fetching Data</p>
            <p className="text-red-400/80">{error}</p>
            <p className="text-xs text-slate-400 mt-2">This might be due to Row Level Security (RLS) policies. Ensure that the `anon` key has read access to this table.</p>
          </div>
        </div>
      );
    }
    if (!data || data.length === 0) {
      return <p className="text-slate-400 text-center p-8">No data found in this table, or access is restricted.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-200 uppercase bg-slate-700/50 sticky top-0">
            <tr>
              {table.columns.map(col => (
                <th key={col.name} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-700 hover:bg-slate-700/40">
                {table.columns.map(col => (
                  <td key={`${rowIndex}-${col.name}`} className="px-4 py-2 font-mono align-top whitespace-nowrap">
                    <div className="max-w-xs truncate" title={typeof row[col.name] === 'object' ? JSON.stringify(row[col.name]) : String(row[col.name])}>
                      {renderCellContent(row[col.name])}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length >= 20 && (
          <p className="text-xs text-center text-slate-500 p-3">Showing first 20 rows.</p>
        )}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-viewer-title"
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <h2 id="data-viewer-title" className="text-lg font-bold text-slate-100">
            Viewing Data for: <span className="text-emerald-400 font-mono">{table.name}</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close data viewer"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="flex-grow overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DataViewerModal;