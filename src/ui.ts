export function configure() {
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(`
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script>
      function setHandler(e) {
        e.preventDefault();
        google.script.run.workflow({
          host: document.getElementById('host').value,
          token: document.getElementById('token').value,
          project: document.getElementById('project').value,
        });
        google.script.host.close();
      }
    </script>
    <style>
    form.form-example {
      display: table;
    }

    div.form-example {
        display: table-row;
    }

    label, input {
        display: table-cell;
        margin-bottom: 10px;
    }

    label {
        padding-right: 10px;
    }
    </style>
  </head>
  <body>
    <form onsubmit="setHandler(event)" class="form-example">
      <div class="form-example">
        <label for="host">Enter your Jira host (e.g. https://host.atlassian.net): </label>
        <input type="text" name="host" id="host" required>
      </div>
      <div class="form-example">
        <label for="token">Enter your API token: </label>
        <input type="text" name="token" id="token" required>
      </div>
      <div class="form-example">
        <label for="project">Enter your JIRA project: </label>
        <input type="text" name="project" id="project" required>
      </div>
      <div class="form-example">
        <input type="submit" value="Set">
      </div>
    </form>
  </body>
</html>
`),
    'Configure API Token',
  )
}
