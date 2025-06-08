import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { open as fsOpen, exists, BaseDirectory } from '@tauri-apps/plugin-fs';

export function useFiles() {
  const file = ref<object>({})

  async function openSelector() {
    const filePath = await open({
      multiple: false,
      directory: false,
    });
    if (!filePath) {
      console.warn('No file selected', filePath);
      return;
    }
  }

  async function readFile(id: string) {
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
    openSelector,
    readFile,
  }
}