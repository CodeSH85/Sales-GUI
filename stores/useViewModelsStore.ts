import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ViewModel, Item } from '../type/types';


export const useViewModelsStore = defineStore('viewModels', () => {
  const viewModels = ref<Record<string, ViewModel>>({});
  // {
  //   [key: string]: viewModel
  // }

  /**
   * 
   * @param {string} tabId - current tab id. 
   * @returns {object | undefined} - Returns the ViewModel for the given tabId or undefined if it does not exist.
   */
  function getViewModel(tabId: string): ViewModel | undefined {
    return viewModels.value[tabId];
  }

  /**
   * 
   * @param {string} tabId - current tab id.
   * @param {array} items - array of items to be set to the ViewModel items.
   */
  function setViewModel(tabId: string, items: Item[]) {
    if (!viewModels.value[tabId]) {
      viewModels.value[tabId] = {
        id: tabId,
        items,
        values: {}
      };
    } else {
      viewModels.value[tabId].items = items;
    }
  }

  /**
   * 
   * @param {string} tabId - current tab id.
   * @param {array} item - item to be added to the ViewModel items.
   */
  function addItem(tabId: string, item: Item) {
    const isViewModelExist = viewModels.value[tabId];
    if (isViewModelExist) {
      viewModels.value[tabId].items.push(item);
    }
  }

  /**
   * 
   * @param {string} tabId - current tab id.
   * @param {number} index - index of the item in the ViewModel items.
   * @param key   - key of the item to be updated in ViewModel[index].items.
   * @param value - value to be set to the key.
   */
  function updateItem<K extends keyof Item>(tabId: string, index: number, key: K, value: Item[K]) {
    const isViewModelExist = viewModels.value[tabId];
    if (isViewModelExist && viewModels.value[tabId].items?.[index]) {
      if (key in viewModels.value[tabId].items[index]) {
        viewModels.value[tabId].items[index][key] = value;
      }
    }
  }

  /**
   * 
   * @param {string} tabId - current tab id.
   * @param {string} key - key of the value to be updated in the ViewModel values.
   * @param {any} value - value to be set to the key.
   */
  function updateValue(tabId: string, key: string, value: any) {
    const isViewModelExist = viewModels.value[tabId];
    if (isViewModelExist && viewModels.value[tabId].values) {
      viewModels.value[tabId].values[key] = value;
    }
  }
  
  /**
   * 
   * @param {string} tabId - current tab id.
   * @param {number} index - index of the item in the ViewModel items.
   * @param {string} key - key of the item to be removed from ViewModel[index].items.
   */
  function removeItem(tabId: string, index: number, key: string) {
    const isViewModelExist = viewModels.value[tabId];
    if (isViewModelExist && viewModels.value[tabId].items[index]) {
      viewModels.value[tabId].items.splice(index, 1);
    }
  }

  return {
    viewModels,
    getViewModel,
    setViewModel,
    addItem,
    updateItem,
    updateValue,
    removeItem
  }
})