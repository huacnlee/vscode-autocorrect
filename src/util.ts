import cp = require('child_process');
import vscode = require('vscode');
import util = require('util');
import http = require('https');
const autocorrectLib = import('@huacnlee/autocorrect');

export const outputChannel = vscode.window.createOutputChannel('AutoCorrect');
let autocorrect: any;
autocorrectLib
  .then((ac) => {
    autocorrect = ac;
  })
  .catch((err) => {
    console.error('Load AutoCorrect WebAssmebly fail:', err);
  });

export function formatFor(raw: string, filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    resolve(autocorrect.formatFor(raw, filename));
  });
}

export function lintFor(raw: string, filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    resolve(autocorrect.lintFor(raw, filename));
  });
}

export const lintDiagnosticCollection =
  vscode.languages.createDiagnosticCollection('AutoCorrect');

export function getBinPath(): string {
  const config = vscode.workspace.getConfiguration('autocorrect');
  return config['path'];
}

export function getRootDir(document: vscode.TextDocument): string | undefined {
  if (vscode.window.activeTextEditor) {
    document = vscode.window.activeTextEditor.document;
  }

  // console.log('--- getRootDir', document.uri);

  let rootDir = vscode.workspace.getWorkspaceFolder(document.uri);
  if (!rootDir) {
    return;
  }

  return rootDir.uri.fsPath;
}
