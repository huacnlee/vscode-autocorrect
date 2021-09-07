import cp = require('child_process');
import vscode = require('vscode');
import util = require('util');
import http = require('https');
var path = require('path');
const autocorrectLib = import('@huacnlee/autocorrect');
import ignore from 'ignore';

export const outputChannel = vscode.window.createOutputChannel('AutoCorrect');
let autocorrect: any;
autocorrectLib
  .then((ac) => {
    autocorrect = ac;
  })
  .catch((err) => {
    console.error('Load AutoCorrect WebAssmebly fail:', err);
  });

export async function isIgnore(
  document: vscode.TextDocument
): Promise<boolean> {
  let root = getRootDir(document);
  let filename = document.fileName;
  if (!root) {
    root = path.dirname(document.uri.fsPath);
  }
  let ignoreBody = '';

  try {
    const gitingore = await vscode.workspace.fs.readFile(
      vscode.Uri.file(path.join(root, '.gitignore'))
    );
    ignoreBody += gitingore.toString();
  } catch (e) {}
  try {
    const autocorrectignore = await vscode.workspace.fs.readFile(
      vscode.Uri.file(path.join(root, '.autocorrectignore'))
    );
    ignoreBody += autocorrectignore.toString();
  } catch (e) {}

  const ignores = ignoreBody.split('\n');
  const ig = ignore().add(ignores);

  filename = path.relative(root, filename);

  return ig.ignores(filename);
}

export async function formatFor(
  raw: string,
  document: vscode.TextDocument
): Promise<any> {
  let filename = document.fileName;

  if (await isIgnore(document)) {
    return raw;
  }

  return autocorrect.formatFor(raw, filename);
}

export async function lintFor(
  raw: string,
  document: vscode.TextDocument
): Promise<any> {
  let filename = document.fileName;

  if (await isIgnore(document)) {
    return null;
  }

  return autocorrect.lintFor(raw, filename);
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

  let rootDir = vscode.workspace.getWorkspaceFolder(document.uri);
  if (!rootDir) {
    return;
  }

  console.log('--- getRootDir', rootDir.uri.fsPath);

  return rootDir.uri.fsPath;
}
