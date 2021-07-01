import vscode = require("vscode");
import cp = require("child_process");
import util = require("util");
import { getBinPath, lintDiagnosticCollection } from "./util";

interface ICheckResult {
  l: number;
  c: number;
  old: string;
  new: string;
}

export function lintDocument(document: vscode.TextDocument) {
  const binPath = getBinPath();

  cp.exec(binPath + " --lint " + document.fileName, (err, stdout, stderr) => {
    if (stderr) {
      console.warn("AutoCorrect exec error:", stderr);
    }

    const ret: ICheckResult[] = [];
    const rawItems = stdout.trim().split("\n");
    rawItems.map((raw) => {
      try {
        const result = JSON.parse(raw);
        result.filename = document.fileName;
        ret.push(result);
      } catch (e) {}
    });

    diagnosticResults(document, ret);
  });
}

function diagnosticResults(
  document: vscode.TextDocument,
  results: Array<ICheckResult>
) {
  const fileName = document.fileName;
  const fileUri = vscode.Uri.parse(fileName);
  const diagnostics: Array<vscode.Diagnostic> = [];

  results.forEach((result) => {
    const range = new vscode.Range(
      result.l - 1,
      result.c - 1,
      result.l - 1,
      result.c + result.old.length - 1
    );

    const msg = result.new;

    const diagnostic = new vscode.Diagnostic(
      range,
      msg,
      vscode.DiagnosticSeverity.Warning
    );
    diagnostic.source = "autocorrect";

    diagnostics.push(diagnostic);
  });

  lintDiagnosticCollection.set(fileUri, diagnostics);
}
