# Jira Sheets

## why?

The official Jira integration only offers one-way sync.

## idea

We pull in Jira data based on the JQL query in cell `A1`.

Then we use header row (row B) to define which fields we want fetched using names:

- `fieldname` for one way sync
- `fieldname.name` if nested
- `fieldname (sync)` - for two way sync, only non-nested fields
- `propertyname (property)` - for storing custom into ticket itself (store both the value and formula as JSON)

For sync fields we check if they're different and if yes, we issue an update to them.

Perhaps in the A column we store checkboxes stating "sync" state.
Whenever you edit something in the (sync) or (property), you can select "sync" from the menu to update these issues.
To create new issues, we could just check if there are rows with an empty "key".

Non-synced properties should use
[Protection](https://developers.google.com/apps-script/reference/spreadsheet/protection)
with warning.

We can keep the row order because when we fill in/sync new data, we can just
re-use the keys that are already there.

Maybe two buttons - update Spreadsheet, update Jira.
Use onEdit trigger to mark changed values (also change background?).
Possibly store original synced value and when syncing to Jira -- compare them.
If they're different, potential conflict.
Reset them after update from Jira.

Maybe there's a mode for grouping:

- subtasks/epic issues could be automatically grouped under a foldable row?
- alternatively, we could prefix the names with some > character (and new rows created with it would also sync back to correct parent)

### questions

- How can we represent array fields?
  - perhaps their names separated with `;`?
- What are Jira properties?
  - they're like custom fields, but hidden from UI - we can use them to add any arbitrary JSON data to Issues, Comments, Projects, etc.
  - https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/#jira-entity-properties
- Can we safely remove the whole sheet when the query is changed?
  - likely yes, because we can stored all of the relevant data in Jira properties
  - issues might arise with calculated cells (ones with functions)

## how to start development on this?

- Clone the repo.
- Run `yarn`
- Authenticate with your Google Account: `yarn google:login`
- Ensure your Google account allows API access, by [switching it on](https://script.google.com/home/usersettings)
- Create the linked Spreadsheet in your account: `yarn google:create`
- Publish the code after making changes using: `yarn google:publish`

After refreshing the newly created Spreadsheet, you should be able to invoke the commands using the "Add-ons" menu. You'll need a Jira API key, so make sure to [create one](https://id.atlassian.com/manage-profile/security/api-tokens).

### jira API reference

- https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/#editing-an-issue-examples#setting-custom-field-data-for-other-field-types
- https://developer.atlassian.com/server/jira/platform/updating-an-issue-via-the-jira-rest-apis-6848604/
- https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/#jira-entity-properties
- https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-put

### google apps ref

- https://yagisanatode.com/2019/04/01/working-with-google-apps-script-in-visual-studio-code-using-clasp/
