import { resolve } from "path";
import {
  CodeActionProvider,
  TextDocument,
  Range,
  CodeActionContext,
  CancellationToken,
  CodeAction,
  CodeActionKind,
  DiagnosticSeverity,
  Diagnostic,
} from "vscode";

export default class QuickFixProvider implements CodeActionProvider {
  public async provideCodeActions(
    document: TextDocument,
    range: Range,
    context: CodeActionContext,
    token: CancellationToken
  ): Promise<any> {
    const codeActions = context.diagnostics
      .filter((diagnostic) => {
        return diagnostic.source === "autocorrect";
      })
      .map((diagnostic) => {
        const fixAction = new CodeAction(
          "AutoCorrect",
          CodeActionKind.QuickFix
        );
        fixAction.isPreferred = true;
        fixAction.diagnostics = [diagnostic];
        fixAction.command = {
          title: "Correct",
          command: "autocorrect.diagnostic-quickfix",
          arguments: [document, diagnostic, fixAction],
        };

        return fixAction;
      });

    return new Promise((resolve) => {
      return resolve(codeActions);
    });
  }
}
