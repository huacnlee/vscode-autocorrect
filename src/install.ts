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
    outputChannel.appendLine(
      `AutoCorrect not installed, can not found ${getBinPath()}.`
    );
    showInstallMessage();
    return;
  }

  if (currentVersion !== lastVersion) {
    outputChannel.appendLine(
      `Current: ${currentVersion}, Latest: ${lastVersion}`
    );
    showInstallMessage();
  }
}

export function showInstallMessage() {
  if (hasShowedInstallMessage) {
    return;
  }

  hasShowedInstallMessage = true;

  outputChannel.appendLine("");
  outputChannel.appendLine(`You can run this script to install or upgrade:`);
  outputChannel.appendLine(`curl -sSL https://git.io/JcGER | bash`);
  outputChannel.appendLine("");
  outputChannel.show();
}
