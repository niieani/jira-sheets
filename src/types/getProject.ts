export interface Project {
  expand: string
  /** URL */
  self: string
  id: string
  key: string
  description: string
  lead: User
  components: any[]
  issueTypes: IssueType[]
  assigneeType: string
  versions: any[]
  name: string
  roles: Roles
  avatarUrls: AvatarUrls
  projectTypeKey: string
  simplified: boolean
  style: 'next-gen' | 'classic'
  isPrivate: boolean
  properties: Properties
  entityId: string
  uuid: string
}

export interface AvatarUrls {
  '48x48': string
  '24x24': string
  '16x16': string
  '32x32': string
}

export interface IssueType {
  /** URL */
  self: string
  id: string
  description: string
  iconUrl: string
  name: string
  subtask: boolean
  avatarId: number
}

export interface User {
  self: string
  accountId: string
  avatarUrls: AvatarUrls
  displayName: string
  active: boolean
}

export interface Properties {}

export interface Roles {
  'atlassian-addons-project-access': string
  Administrator: string
  Viewer: string
  Member: string
}
