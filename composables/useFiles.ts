import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog';

export function useFiles() {
  const file = ref<object>({})

  /**
   * 
   * @returns {Promise<string | null | undefined>} Returns the path of the selected file or null if no file was selected.
   */
  async function openFile(): Promise<string | null | undefined> {
    try {
      const result = await open({
        multiple: false,
        filters: [
          {
            name: 'excel files',
            extensions: ['xls', 'xlsx'],
          }
        ]
      })
      return result
    } catch (error) {
      console.error('Error fetching files:', error)
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
