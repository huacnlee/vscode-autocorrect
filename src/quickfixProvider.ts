import {
  CancellationToken,
  CodeAction,
  CodeActionContext,
  CodeActionKind,
  CodeActionProvider,
  Range,
  TextDocument,
} from 'vscode';

export default class QuickFixProvider implements CodeActionProvider {
  public async provideCodeActions(
    document: TextDocument,
    range: Range,
    context: CodeActionContext,
    token: CancellationToken
  ): Promise<any> {
    const codeActions = context.diagnostics
      .filter((diagnostic) => {
        return (
          diagnostic.source === 'AutoCorrect' ||
          diagnostic.source === 'Spellcheck'
        );
      })
      .map((diagnostic) => {
        const fixAction = new CodeAction(
          diagnostic.source || 'AutoCorrect',
          CodeActionKind.QuickFix
        );
        fixAction.isPreferred = true;
        fixAction.diagnostics = [diagnostic];
        fixAction.command = {
          title: 'AutoCorrect',
          command: 'autocorrect.diagnostic-quickfix',
          arguments: [document, diagnostic, fixAction],
        };

        return fixAction;
      });

    return new Promise((resolve) => {
      return resolve(codeActions);
    });
  }
}
