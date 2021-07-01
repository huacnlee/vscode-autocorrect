import vscode = require("vscode");

export function formatDocument(document: vscode.TextDocument) {
  const config = vscode.workspace.getConfiguration("autocorrect");

  const cmdPath = config["path"] || "autocorrect";

  const exec = require("child_process").exec;
  exec(cmdPath + " --fix " + document.fileName, (err: Error) => {
    if (err) {
      console.log(err);
    }
  });
}
