import cp = require("child_process");
import vscode = require("vscode");
import {
  getBinPath,
  getToolVersion,
  getLastestVersion,
  outputChannel,
} from "./util";

let hasShowedInstallMessage = false;

export async function installAutoCorrect(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
}

export async function checkUpdates(): Promise<void> {
  const [currentVersion, lastVersion] = await Promise.all([
    getToolVersion(),
    getLastestVersion(),
  ]);

  if (!lastVersion) {
    return;
  }

  if (!currentVersion) {
    const msg =
      `Failed to find the "autocorrect" binary in either (${getBinPath()}).\n` +
      "Check PATH, or Install AutoCorrect and reload the window. ";
    await showInstallMessage(msg, "Install");
    return;
  }

  if (currentVersion !== lastVersion) {
    const msg = `AutoCorrect has new version ${lastVersion}.`;

    await showInstallMessage(msg, "Update");
  }
}

async function showInstallMessage(msg: string, btnText: string) {
  if (hasShowedInstallMessage) {
    return;
  }

  hasShowedInstallMessage = true;

  const choice = await vscode.window.showInformationMessage(msg, btnText);
  if (choice === btnText) {
    await installOrUpdate();
  }
}

async function installOrUpdate() {
  const sh = new vscode.ShellExecution("curl -sSL https://git.io/JcGER | bash");
  const task = new vscode.Task(
    { type: "install-autocorrect" },
    vscode.TaskScope.Workspace,
    "Install",
    "AutoCorrect",
    sh,
    []
  );

  await vscode.tasks.executeTask(task);
}
