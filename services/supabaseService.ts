import { Table, Column } from '../types';

async function fetchWithCredentials(apiUrl: string, key: string) {
    const response = await fetch(apiUrl, {
        headers: {
            'apikey': key,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to connect to Supabase. Status: ${response.status} ${response.statusText}. Check your URL and Key.`);
    }
    return response.json();
}

function normalizeUrl(url: string): string {
    if (!url) {
        throw new Error("Supabase URL is required.");
    }
    let fullUrl = url.trim();
    try {
        const parsedUrl = new URL(fullUrl.startsWith('http') ? fullUrl : `https://${fullUrl}`);
        return parsedUrl.origin;
    } catch (e) {
        throw new Error("The provided Supabase URL is not valid.");
    }
}

/**
 * Fetches the database schema from a Supabase project's auto-generated OpenAPI specification.
 * @param url The URL of the Supabase project.
 * @param key The anon key for the Supabase project.
 * @returns A promise that resolves to an array of tables.
 * @throws An error if the API request fails or credentials are missing.
 */
export async function fetchSchema(url: string, key: string): Promise<Table[]> {
    if (!key) {
        throw new Error("Supabase Key is required.");
    }
    const fullUrl = normalizeUrl(url);
    const spec = await fetchWithCredentials(`${fullUrl}/rest/v1/`, key);
    
    const definitions = spec.definitions;
    if (!definitions) {
        throw new Error("Could not find table definitions in the Supabase API spec. The schema might be empty or inaccessible.");
    }
    
    const tables: Table[] = [];
    const tableNames = Object.keys(definitions).filter(name => 
        definitions[name].type === 'object' && definitions[name].properties
    );

    for (const tableName of tableNames) {
        const tableDef = definitions[tableName];
        const columns: Column[] = [];

        for (const columnName in tableDef.properties) {
            const columnDef = tableDef.properties[columnName];
            const isPrimaryKey = !!columnDef.description?.includes('<pk/>');
            let columnType = columnDef.format || columnDef.type;
            if (columnType === 'string' && columnDef.format) {
                columnType = columnDef.format;
            }
            const comment = columnDef.description
              ?.replace(/Note:\nThis is a (Primary|Foreign) Key\.<(pk|fk)[^>]*?>/g, '')
              .trim() || '';

            columns.push({
                name: columnName,
                type: columnType,
                comment: comment,
                isPrimaryKey: isPrimaryKey,
            });
        }
        tables.push({ name: tableName, columns });
    }
    return tables.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Fetches data from a specific table in a Supabase project.
 * @param tableName The name of the table to fetch data from.
 * @param url The URL of the Supabase project.
 * @param key The anon key for the Supabase project.
 * @returns A promise that resolves to an array of rows from the table.
 * @throws An error if the API request fails.
 */
export async function fetchTableData(tableName: string, url: string, key: string): Promise<any[]> {
    const fullUrl = normalizeUrl(url);
    // Fetch top 20 rows, selecting all columns
    const data = await fetchWithCredentials(`${fullUrl}/rest/v1/${tableName}?select=*&limit=20`, key);
    if (!Array.isArray(data)) {
        throw new Error("The response from the data endpoint was not an array. This may be due to RLS policies or an incorrect table name.");
    }
    return data;
}