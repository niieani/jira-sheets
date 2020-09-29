export interface SearchResult {
  expand: string
  startAt: number
  maxResults: number
  total: number
  issues: Issue[]
}

export interface Issue {
  expand: string
  id: string
  self: string
  key: string
  fields: Fields
}

export interface Fields {
  summary: string
  assignee: null
  created: string
  status: Status
  [other: string]: any
}

export interface Status {
  self: string
  description: string
  iconUrl: string
  name: string
  id: string
  statusCategory: StatusCategory
}

export interface StatusCategory {
  self: string
  id: number
  key: string
  colorName: string
  name: string
}
