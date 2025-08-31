import React, { useState, useCallback, useEffect } from 'react';
import SchemaVisualizer from './components/SchemaVisualizer';
import DataViewerModal from './components/DataViewerModal';
import { DatabaseIcon, WarningIcon } from './components/Icons';
import { Table } from './types';
import { fetchSchema, fetchTableData } from './services/supabaseService';

// =======================================================================
// --- ¡ATENCIÓN! CONFIGURA AQUÍ TUS CREDENCIALES DE SUPABASE ---
// Reemplaza 'YOUR_SUPABASE_URL' y 'YOUR_SUPABASE_ANON_KEY' con los
// valores reales de tu proyecto de Supabase.
// Puedes encontrarlos en tu panel de Supabase:
// Settings -> API -> Project URL y Project API Keys (anon public).
// =======================================================================
const SUPABASE_URL = 'https://pczicqdazwnwdtprbrah.supabase.co'; // Ejemplo: 'https://xxxxxx.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjemljcWRhendud2R0cHJicmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDc3NDYsImV4cCI6MjA3MjIyMzc0Nn0.1ebQLfi0ENmWDpHqPlPOeFaQtl0F7OEmMmBTduQ8q-M'; // La clave pública (anon key)

type ConnectionState = 'connecting' | 'connected' | 'error';

interface ModalState {
  isOpen: boolean;
  table: Table | null;
  data: any[] | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-10 bg-slate-800/50 rounded-lg border border-slate-700">
    <DatabaseIcon className="w-16 h-16 text-emerald-400 animate-pulse" />
    <p className="mt-4 text-lg font-semibold text-slate-300">Conectando a Supabase...</p>
    <p className="text-slate-400">Obteniendo el esquema de tu base de datos</p>
  </div>
);

const ConnectionError: React.FC<{ message: string | null }> = ({ message }) => (
  <div className="max-w-md mx-auto text-center p-8 bg-slate-800/50 rounded-lg border border-red-500/50">
      <WarningIcon className="w-16 h-16 text-red-400 mx-auto" />
      <h2 className="mt-4 text-2xl font-bold text-slate-100">Error de Conexión</h2>
      <p className="mt-2 text-red-300">{message || 'Ocurrió un error desconocido.'}</p>
  </div>
);


const App: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const [schema, setSchema] = useState<Table[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    table: null,
    data: null,
    isLoading: false,
    error: null,
  });
  
  useEffect(() => {
    const connectToSupabase = async () => {
      setConnectionState('connecting');
      setErrorMessage(null);
      
      if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_KEY === 'YOUR_SUPABASE_ANON_KEY' || !SUPABASE_URL || !SUPABASE_KEY) {
        setErrorMessage("Por favor, actualiza las constantes SUPABASE_URL y SUPABASE_KEY en la parte superior del fichero App.tsx con tus credenciales de Supabase.");
        setConnectionState('error');
        return;
      }

      try {
        const fetchedSchema = await fetchSchema(SUPABASE_URL, SUPABASE_KEY);
        setSchema(fetchedSchema);
        setConnectionState('connected');
      } catch (err) {
        console.error("Connection Error:", err);
        setErrorMessage(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        setConnectionState('error');
      }
    };
    connectToSupabase();
  }, []);

  const handleViewData = useCallback(async (tableName: string) => {
    const tableToShow = schema.find(t => t.name === tableName);
    if (!tableToShow) return;

    setModalState({ isOpen: true, table: tableToShow, data: null, isLoading: true, error: null });

    try {
      const data = await fetchTableData(tableName, SUPABASE_URL, SUPABASE_KEY);
      setModalState(prev => ({ ...prev, data, isLoading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudieron obtener los datos de la tabla.';
      setModalState(prev => ({ ...prev, error: message, isLoading: false }));
    }
  }, [schema]);

  const handleCloseModal = () => {
    setModalState({ isOpen: false, table: null, data: null, isLoading: false, error: null });
  };

  const renderContent = () => {
    switch (connectionState) {
      case 'connecting':
        return <LoadingSpinner />;
      case 'connected':
        return schema.length > 0 
          ? <SchemaVisualizer schema={schema} onViewDataTable={handleViewData} /> 
          : <div className="text-center text-slate-400 p-8 bg-slate-800/50 rounded-lg border border-slate-700">No se encontraron tablas en el esquema 'public' o el acceso está restringido.</div>;
      case 'error':
      default:
        return <ConnectionError message={errorMessage} />;
    }
  };

  return (
    <main className="bg-slate-900 text-slate-200 min-h-screen p-4 sm:p-6 lg:p-8 font-sans flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(30,213,147,0.1),_transparent_30%)]" aria-hidden="true"></div>
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">Visualizador de Esquema de Supabase</h1>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Una representación visual en tiempo real de la estructura de tu base de datos.</p>
        </header>
        
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
      
      <footer className="relative z-10 text-center mt-12 pb-4 text-slate-500">
        Seguirme en Twitter:{' '}
        <a 
          href="https://x.com/MKey2023" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 transition-colors font-medium underline"
        >
          BuildWithAI
        </a>
      </footer>

      {modalState.isOpen && modalState.table && (
        <DataViewerModal
          table={modalState.table}
          data={modalState.data}
          isLoading={modalState.isLoading}
          error={modalState.error}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default App;