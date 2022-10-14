import vscode = require('vscode');
import { lintDiagnosticCollection, lintFor } from './util';

interface ICheckResult {
  filename: string;
  /**
   * line
   */
  l: number;
  /**
   * column
   */
  c: number;
  /**
   * The old string
   */
  old: string;
  /**
   * The corrected new string
   */
  new: string;

  /**
   * 1 error, 2 warning
   */
  severity: 0 | 1 | 2;
}

interface ILintResult {
  filepath: number;
  lines: [ICheckResult];
}

export async function lintDocument(
  document: vscode.TextDocument
): Promise<void> {
  // Clean last diagnostics of this document first.
  // Because user may change the ignore or settings to disable.
  lintDiagnosticCollection.delete(document.uri);

  const documentText = document.getText();
  const result = await lintFor(documentText, document);

  const ret: ICheckResult[] = [];

  result.lines.map((line: any) => {
    line.filename = document.fileName;
    ret.push(line);
  });

  diagnosticResults(document, ret);
}

function diagnosticResults(
  document: vscode.TextDocument,
  results: Array<ICheckResult>
) {
  const fileName = document.fileName;
  const fileUri = vscode.Uri.parse(fileName);
  const diagnostics: Array<vscode.Diagnostic> = [];

  results.forEach((result) => {
    // count lines for mult-lines
    const additionLines = result.old.split('\n').length - 1;

    const range = new vscode.Range(
      result.l - 1,
      result.c - 1,
      result.l + additionLines - 1,
      result.c + result.old.length - 1
    );

    let msg = result.new;
    let source = 'AutoCorrect';

    let severity = vscode.DiagnosticSeverity.Information;
    switch (result.severity) {
      case 1:
        severity = vscode.DiagnosticSeverity.Warning;
        break;
      case 2:
        severity = vscode.DiagnosticSeverity.Information;
        source = 'Spellcheck';
        break;
    }

    const diagnostic = new vscode.Diagnostic(range, msg, severity);
    diagnostic.source = source;

    diagnostics.push(diagnostic);
  });

  lintDiagnosticCollection.set(fileUri, diagnostics);
}
