import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog';

export type FileType = 'excel' | 'json' | 'csv' | 'custom';

interface FileTypeConfig {
  name: string;
  extensions: string[];
}

const FILE_TYPE_CONFIGS: Record<FileType, FileTypeConfig> = {
  excel: {
    name: 'Excel files',
    extensions: ['xls', 'xlsx']
  },
  json: {
    name: 'JSON files',
    extensions: ['json']
  },
  csv: {
    name: 'CSV files',
    extensions: ['csv']
  },
  custom: {
    name: 'All files',
    extensions: ['*']
  }
};

export function useFiles() {
  const file = ref<object>({})

  /**
   * 
   * @returns {Promise<unknown | null>} Returns JSON data parsed from the selected Excel file or null if no file was selected or an error occurred.
   */
  async function openFile(fileType: FileType = 'excel'): Promise<unknown | null> {
    try {
      const filter = FILE_TYPE_CONFIGS[fileType];

      const filePath = await open({
        multiple: false,
        filters: [filter]
      });

      if (!filePath) return null;

      const jsonData = await invoke('parse_excel', { path: filePath });
      return jsonData;

    } catch (error) {
      console.error('Error opening file:', error);
      return null;
    }
  }

  async function getFile(id: string) {
    try {
      const result = await invoke<string>('read_file', { id })
      console.log('Files fetched successfully:', id, result)
      if (result) {
        file.value = JSON.parse(result)
      }
      return file.value
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  return {
    file,
    openFile,
    getFile,
  }
}
