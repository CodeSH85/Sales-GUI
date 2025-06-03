import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog';
import { open as openFilePlugin } from '@tauri-apps/plugin-fs';

export function useFiles() {
  const file = ref<object>({})

  /**
   * 
   * @returns {Promise<string | null | undefined>} Returns the path of the selected file or null if no file was selected.
   */
  async function openFile(): Promise<string | null | undefined> {
    try {
      const filePath = await open({
        multiple: false,
        filters: [
          {
            name: 'excel files',
            extensions: ['xls', 'xlsx'],
          }
        ]
      })
      if (!filePath) {
        return filePath
      }

      const file = await openFilePlugin(filePath, {
        read: true
      });

      const stat = await file.stat();
      const buf = new Uint8Array(stat.size);
      await file.read(buf);
      const textContents = new TextDecoder().decode(buf);
      await file.close();
      return textContents;
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
