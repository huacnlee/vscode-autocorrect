import vscode = require('vscode');
import { formatFor, lintDiagnosticCollection } from './util';

export async function formatDocument(
  document: vscode.TextDocument
): Promise<void> {
  const documentText = document.getText();
  const result = await formatFor(documentText, document);

  if (result.error) {
    return;
  }
  if (result.out.trim().length == 0) {
    return;
  }
  if (result.out == documentText) {
    return;
  }

  const writeData = Buffer.from(result.out, 'utf8');
  vscode.workspace.fs.writeFile(document.uri, writeData);

  // clean warning
  lintDiagnosticCollection.clear();
}
