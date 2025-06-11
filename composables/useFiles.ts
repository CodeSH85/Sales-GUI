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

  /**
   * 
   * @param id 
   * @returns 
   */
  async function readFile(id: string) {
    try {
      const result = await invoke<string>('read_file', { id })
      console.log('Files fetched successfully:', id, result)
      if (result) {
        file.value = JSON.parse(result)
      }
      return file.value
    } catch (error) {
      console.error('Error fetching file:', error)
    }
  }

  /**
   * 
   * @param division - folder you want to create at.
   * @param data - data you want to save
   * @returns 
   */
  async function createFile(division: string, data: Record<string, any>): Promise<string | undefined> {
    try {
      const result = await invoke<string>('create_file', { division, data })
      return result
    } catch (error) {
      console.error('Error create file:', error)
      throw error
    }
  }

  /**
   * 
   * @param division - folder you want to delete at.
   * @param id - file you want to delete.
   * @returns 
   */
  async function deleteFile(division: string, id: string): Promise<string | undefined> {
    try {
      const result = await invoke<string>('delete_file', { division, id })
      return result
    } catch (error) {
      console.error('Error delete file:', error)
      throw error
    }
  }

  return {
    file,
    openFile,
    readFile,
    createFile,
    deleteFile
  }
}
