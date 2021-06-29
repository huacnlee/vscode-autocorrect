// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
	ctx.subscriptions.push(vscode.workspace.onDidSaveTextDocument((document) => {
    const formatOnSave =
        vscode.workspace.getConfiguration('auto-correct')['formatOnSave'] || false;
		
    if (formatOnSave) {
      const cmdPath =
          vscode.workspace.getConfiguration('auto-correct')['path'] || 'autocorrect';
      const exec = require('child_process').exec;
      exec(cmdPath + ' --fix ' + document.fileName, (err: Error) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }));
}

// this method is called when your extension is deactivated
export function deactivate() {}
