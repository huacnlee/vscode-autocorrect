import cp = require('child_process');
import vscode = require('vscode');
import util = require('util');
import http = require('https');
var path = require('path');
const autocorrectLib = import('@huacnlee/autocorrect');
import ignore from 'ignore';

let lastConfigMtime = 0;

export const outputChannel = vscode.window.createOutputChannel('AutoCorrect');
let autocorrect: any;
autocorrectLib
  .then((ac) => {
    autocorrect = ac;
  })
  .catch((err) => {
    console.error('Load AutoCorrect WebAssmebly fail:', err);
  });

async function reloadConfig(document?: vscode.TextDocument) {
  let root = getRootDir(document);

  let filename = vscode.Uri.file(path.join(root, '.autocorrectrc'));
  // Ignore if config file not changed.
  let stat = await vscode.workspace.fs.stat(filename);
  if (stat.mtime === lastConfigMtime) {
    return;
  }
  lastConfigMtime = stat.mtime;

  try {
    const configStr = await vscode.workspace.fs.readFile(filename);
    autocorrect.loadConfig(configStr.toString());
  } catch (e) {}
}

export async function isIgnore(
  document: vscode.TextDocument
): Promise<boolean> {
  let root = getRootDir(document);
  let filename = document.fileName;
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

  await reloadConfig(document);

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

  await reloadConfig(document);

  return autocorrect.lintFor(raw, filename);
}

export const lintDiagnosticCollection =
  vscode.languages.createDiagnosticCollection('AutoCorrect');

export function getBinPath(): string {
  const config = vscode.workspace.getConfiguration('autocorrect');
  return config['path'];
}

export function getRootDir(document?: vscode.TextDocument): string | undefined {
  if (vscode.window.activeTextEditor) {
    document = vscode.window.activeTextEditor.document;
  }

  if (!document) {
    return undefined;
  }

  let rootDir = vscode.workspace.getWorkspaceFolder(document.uri);
  if (!rootDir) {
    return path.dirname(document.uri.fsPath);
  }

  console.log('--- getRootDir', rootDir.uri.fsPath);

  return rootDir.uri.fsPath;
}
