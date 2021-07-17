import vscode = require('vscode');
import util = require('util');
import { lintDiagnosticCollection } from './util';

export async function formatDocument(
  document: vscode.TextDocument
): Promise<void> {
  const config = vscode.workspace.getConfiguration('autocorrect');

  const cmdPath = config['path'] || 'autocorrect';

  const exec = require('child_process').exec;
  const execSync = util.promisify(exec);

  execSync(cmdPath + ' --fix ' + document.fileName, (err: Error) => {
    console.log(err);
  });

  // clean warning
  lintDiagnosticCollection.clear();
}
