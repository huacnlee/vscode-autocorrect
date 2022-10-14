// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { formatDocument } from './formatting';
import { lintDocument } from './lint';
import QuickFixProvider from './quickfixProvider';
import { lintDiagnosticCollection } from './util';

let lastLintTimer: any;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
  // @ts-ignore
  __webpack_public_path__ =
    // @ts-ignore
    ctx.extensionUri.toString().replace('file:///', '') + '/dist/';

  // console.log(
  //   '---------- __webpack_public_path__:',
  //   ctx.extensionUri.toString()
  // );

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
      }
    )
  );

  // OpenTextDocument to lint
  ctx.subscriptions.push(lintDiagnosticCollection);

  ctx.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(async (document) => {
      const config = vscode.workspace.getConfiguration('autocorrect');
      if (!config['enable']) {
        return;
      }

      await lintDocument(document);
    })
  );

  // Format command
  ctx.subscriptions.push(
    vscode.commands.registerCommand('autocorrect.format', async () => {
      const document = vscode.window.activeTextEditor?.document;
      if (document) {
        await formatDocument(document);
      }
    })
  );

  ctx.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(async (event) => {
      const config = vscode.workspace.getConfiguration('autocorrect');

      if (!config['enable']) {
        return;
      }

      if (lastLintTimer) {
        clearTimeout(lastLintTimer);
      }
      lastLintTimer = setTimeout(async () => {
        await lintDocument(event.document);
      }, 500);
    })
  );

  // Format on Save
  ctx.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(async (e) => {
      if (e.reason === vscode.TextDocumentSaveReason.Manual) {
        const document = e.document;
        const config = vscode.workspace.getConfiguration('autocorrect');

        if (!config['enable']) {
          return;
        }

        if (config['formatOnSave']) {
          await formatDocument(document);
        }
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
