import vscode = require('vscode');
import ignore from 'ignore';
import * as path from 'path';
import { Utils } from 'vscode-uri';

let autocorrect: any;

let lastConfigMtime = 0;
export const outputChannel = vscode.window.createOutputChannel('AutoCorrect');

const getAutoCorrect = async () => {
  if (autocorrect) {
    return autocorrect;
  }

  autocorrect = await new Promise((resolve, reject) => {
    import('@huacnlee/autocorrect')
      .then((ac) => {
        resolve(ac);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return autocorrect;
};

async function reloadConfig(document?: vscode.TextDocument) {
  let root = getRootDir(document);

  let filename = Utils.joinPath(root, '.autocorrectrc');
  // Ignore if config file not changed.
  try {
    let stat = await vscode.workspace.fs.stat(filename);
    if (stat.mtime === lastConfigMtime) {
      return;
    }
    lastConfigMtime = stat.mtime;
  } catch (e) {
    return;
  }

  try {
    const configStr = await vscode.workspace.fs.readFile(filename);
    (await getAutoCorrect()).loadConfig(configStr.toString());
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
      Utils.joinPath(root, '.gitignore')
    );
    ignoreBody += gitingore.toString();
  } catch (e) {}
  try {
    const autocorrectignore = await vscode.workspace.fs.readFile(
      Utils.joinPath(root, '.autocorrectignore')
    );
    ignoreBody += autocorrectignore.toString();
  } catch (e) {}

  const ignores = ignoreBody.split('\n');
  const ig = ignore().add(ignores);

  filename = path.relative(root.path, filename);

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

  return (await getAutoCorrect()).formatFor(raw, filename);
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

  return (await getAutoCorrect()).lintFor(raw, filename);
}

export const lintDiagnosticCollection =
  vscode.languages.createDiagnosticCollection('AutoCorrect');

export function getBinPath(): string {
  const config = vscode.workspace.getConfiguration('autocorrect');
  return config['path'];
}

export function getRootDir(document?: vscode.TextDocument): vscode.Uri {
  if (vscode.window.activeTextEditor) {
    document = vscode.window.activeTextEditor.document;
  }

  if (!document) {
    return vscode.Uri.parse('/');
  }

  let rootDir = vscode.workspace.getWorkspaceFolder(document.uri);
  if (!rootDir) {
    return Utils.dirname(document.uri);
  }

  // console.log('--- rootDir:', rootDir.uri);

  return rootDir.uri;
}
