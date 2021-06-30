// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function formatDocument(document: vscode.TextDocument) {
  const config = vscode.workspace.getConfiguration("auto-correct");

  const cmdPath = config["path"] || "autocorrect";
  const exec = require("child_process").exec;
  exec(cmdPath + " --fix " + document.fileName, (err: Error) => {
    if (err) {
      console.log(err);
    }
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(
    vscode.commands.registerCommand("auto-correct.format", () => {
      const document = vscode.window.activeTextEditor?.document;
      if (document) {
        formatDocument(document);
      }
    })
  );

  ctx.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      const config = vscode.workspace.getConfiguration("auto-correct");
      if (config["formatOnSave"]) {
        formatDocument(document);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
