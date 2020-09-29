import { configure } from './ui'
import { googleAppsAdapter } from './google-apps-interop/googleAppsAdapter'
import { getColumnName } from './helpers'
import { SearchResult } from './types/searchForIssues'

// we use a symlinked jira.js because we want to compile it for es-modules,
// rather than use the pre-compiled commonjs version which would trip up rollup
import { Client } from './jira.js'

const JIRA_HOST_KEY = 'jira_host'
const JIRA_API_KEY_PROPERTY_KEY = 'jira_api_key'
const JIRA_PROJECT_KEY = 'jira_project_key'

export function onOpen(e: any) {
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('Start workflow', 'workflow')
  menu.addToUi()
}

export async function workflow({
  host,
  token,
  project,
}: { host?: string; token?: string; project?: string } = {}) {
  const userProperties = PropertiesService.getUserProperties()
  if (host && token && project) {
    userProperties.setProperty(JIRA_HOST_KEY, host)
    userProperties.setProperty(JIRA_API_KEY_PROPERTY_KEY, token)
    userProperties.setProperty(JIRA_PROJECT_KEY, project)
  } else {
    const hostProp = userProperties.getProperty(JIRA_HOST_KEY)
    const apiKeyProp = userProperties.getProperty(JIRA_API_KEY_PROPERTY_KEY)
    const projectProp = userProperties.getProperty(JIRA_PROJECT_KEY)
    if (!apiKeyProp || !projectProp || !hostProp) {
      configure()
      return
    } else {
      host = hostProp
      token = apiKeyProp
      project = projectProp
    }
  }

  const client = new Client({
    host,
    authentication: {
      basic: {
        username: Session.getActiveUser().getEmail(),
        apiToken: token,
      },
    },
    baseRequestConfig: {
      responseType: 'json',
      adapter: googleAppsAdapter,
    },
  })

  try {
    const result: SearchResult = await client.issueSearch.searchForIssuesUsingJqlGet(
      {
        jql: `project = ${project}`,
        maxResults: 10,
        fields: ['summary', 'status', 'assignee', 'created'],
      },
    )

    Logger.log('got result')

    // client.issues.editIssue({ fields })
    // Logger.log(result)
    const sheet = SpreadsheetApp.getActive()
    const [firstResult] = result.issues
    const resultKeys = Object.keys(firstResult.fields)
    const keys = ['issuekey', ...resultKeys]
    const values = result.issues.map((issue) => [
      issue.key,
      ...resultKeys.map((key) =>
        typeof issue.fields[key] === 'object'
          ? JSON.stringify(issue.fields[key], null, 2)
          : issue.fields[key],
      ),
    ])
    const range = sheet.getRange(
      `A1:${getColumnName(keys.length)}${values.length + 1}`,
    )
    range.setValues([keys, ...values])
  } catch (e) {
    Logger.log('error')
    Logger.log(e)
  }
}
