import vscode = require('vscode');
import util = require('util');
import { lintDiagnosticCollection, getRootDir } from './util';

export async function formatDocument(
  document: vscode.TextDocument
): Promise<void> {
  const config = vscode.workspace.getConfiguration('autocorrect');

  const cmdPath = config['path'] || 'autocorrect';

  const exec = require('child_process').exec;
  const execSync = util.promisify(exec);

  const rootFolder = getRootDir(document);
  let opts = {} as any;
  if (rootFolder) {
    opts.cwd = rootFolder;
  }

  execSync(cmdPath + ' --fix ' + document.fileName, opts, (err: Error) => {
    console.log(err);
  });

  // clean warning
  lintDiagnosticCollection.clear();
}
