import vscode = require('vscode');
import cp = require('child_process');
import util = require('util');
import { getBinPath, lintDiagnosticCollection } from './util';

interface ICheckResult {
  filename: string;
  l: number;
  c: number;
  old: string;
  new: string;
}

interface ILintResult {
  filepath: number;
  lines: [ICheckResult];
}
interface ILintRootResult {
  count: number;
  messages: [ILintResult];
}

export function lintDocument(document: vscode.TextDocument) {
  const binPath = getBinPath();

  cp.exec(
    binPath + ` --format json --lint \"${document.fileName}"`,
    (err, stdout, stderr) => {
      if (stderr) {
        console.warn('AutoCorrect exec error:', stderr);
      }

      const ret: ICheckResult[] = [];
      const rootResult: ILintRootResult = JSON.parse(stdout);
      if (rootResult.count === 0) {
        return;
      }
      const lines = rootResult.messages[0].lines;

      lines.map((line) => {
        line.filename = document.fileName;
        ret.push(line);
      });

      diagnosticResults(document, ret);
    }
  );
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

    const msg = result.new;

    const diagnostic = new vscode.Diagnostic(
      range,
      msg,
      vscode.DiagnosticSeverity.Warning
    );
    diagnostic.source = 'autocorrect';

    diagnostics.push(diagnostic);
  });

  lintDiagnosticCollection.set(fileUri, diagnostics);
}
