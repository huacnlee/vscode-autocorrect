// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { checkUpdates } from './install';
import { formatDocument } from './formatting';
import { lintDocument } from './lint';
import { lintDiagnosticCollection } from './util';
import QuickFixProvider from './quickfixProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
  checkUpdates();

  // QuickFix command
  vscode.languages.registerCodeActionsProvider('*', new QuickFixProvider());
  ctx.subscriptions.push(
    vscode.commands.registerCommand(
      'autocorrect.diagnostic-quickfix',
      async (
        document: vscode.TextDocument,
        diagnostic: vscode.Diagnostic,
        codeAction: vscode.CodeAction
      ) => {
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, diagnostic.range, diagnostic.message);
        await vscode.workspace.applyEdit(edit);
        await document.save();
      }
    )
  );

  // OpenTextDocument to lint
  ctx.subscriptions.push(lintDiagnosticCollection);

  ctx.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      const config = vscode.workspace.getConfiguration('autocorrect');

      if (!config['enable']) {
        return;
      }

      lintDocument(document);
    })
  );

  // Format command
  ctx.subscriptions.push(
    vscode.commands.registerCommand('autocorrect.format', async () => {
      const document = vscode.window.activeTextEditor?.document;
      if (document) {
        await formatDocument(document);
        // await document.save();
      }
    })
  );

  // Format on Save
  ctx.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(async (document) => {
      const config = vscode.workspace.getConfiguration('autocorrect');

      if (!config['enable']) {
        return;
      }

      lintDocument(document);

      if (config['formatOnSave']) {
        await formatDocument(document);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
