import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'

export function useFiles() {
  const file = ref<object>({})

  async function getFile(id: string) {
    try {
      const result = await invoke<string>('read_file', { id })
      console.log('Files fetched successfully:', result)
      return file.value
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  return {
    file,
    getFile,
  }
}