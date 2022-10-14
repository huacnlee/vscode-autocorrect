import vscode = require('vscode');
import { formatFor, lintDiagnosticCollection } from './util';

export async function formatDocument(
  document: vscode.TextDocument
): Promise<void> {
  const documentText = document.getText();
  const editor = vscode.window.activeTextEditor;
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

  const firstLine = document.lineAt(0);
  const lastLine = document.lineAt(document.lineCount - 1);
  const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

  // const writeData = Buffer.from(result.out, 'utf8');
  // vscode.workspace.fs.writeFile(document.uri, result.out);
  editor?.edit((edit) => {
    edit.replace(textRange, result.out);
  });
  document.save();

  // clean warning
  lintDiagnosticCollection.clear();
}
