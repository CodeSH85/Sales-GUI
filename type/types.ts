export interface Tab {
  id: string
  title: string
  to: string
  fullPath: string
}

export interface ViewModel {
  id: string
  items: Item[]
  values: Record<string, any>
}

export interface Item {
  key: string
  title: string
  dataType: 'character' | 'integer' | 'float' | 'boolean' | 'array'
  type: 'string' | 'number' | 'select' | 'date' | 'textarea' | 'table'
  required?: boolean
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  items?: Item[]
  searchable?: boolean
  colSpan?: number
  section?: string
}