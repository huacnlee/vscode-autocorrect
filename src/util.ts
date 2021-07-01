import cp = require("child_process");
import vscode = require("vscode");
import util = require("util");
import http = require("https");

const checkUpdateURL =
  "https://api.github.com/repos/huacnlee/autocorrect/releases/latest";

export const outputChannel = vscode.window.createOutputChannel("AutoCorrect");

export const lintDiagnosticCollection =
  vscode.languages.createDiagnosticCollection("AutoCorrect");

export function getBinPath(): string {
  const config = vscode.workspace.getConfiguration("autocorrect");
  return config["path"];
}

export async function getToolVersion(): Promise<string | undefined> {
  const binPath = getBinPath();
  const exec = util.promisify(cp.exec);

  try {
    const { stdout, stderr } = await exec(binPath + " --version");
    if (stderr) {
      console.warn("AutoCorrect exec error:", stderr);

      return;
    }

    const versionParts = stdout.split(" ");
    if (versionParts.length < 2) {
      console.warn("AutoCorrect getToolVersion:", stdout);
      return;
    }

    return versionParts[1].trim();
  } catch (e) {
    console.warn("AutoCorrect exec error:", e);
  }

  return;
}

export async function httpGet(url: string): Promise<string> {
  let body = "";

  await new Promise<void>((resolve, reject) => {
    http.get(
      checkUpdateURL,
      { headers: { "user-agent": "vscode-auto-correct" } },
      (res) => {
        res.on("error", (err) => reject(err));
        res.on("data", (data) => (body += data));
        res.on("end", () => resolve());
      }
    );
  });

  return body;
}

export async function getLastestVersion(): Promise<string | undefined> {
  console.log("Checking last version", checkUpdateURL);
  try {
    const body = await httpGet(checkUpdateURL);
    const data = JSON.parse(body);
    const lastVersion = data.tag_name.replace("v", "");

    return lastVersion;
  } catch (err) {
    console.error("AutoCorrect getLastestVersion error:", err);
    return;
  }
}
