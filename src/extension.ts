// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

const testFilesEndings = [".spec", "_spec", ".test", "_test"];
const testFilesEndingsCamelCase = ["Spec", "Test"];

interface DestinationFileDetails {
  destination: string;
  isTestToFile: boolean;
}
export function findDestinationFile(name = ""): DestinationFileDetails {
  let destination: string | null = null;
  let isTestToFile = false;

  switch (true) {
    case testFilesEndings.some((ending) => name.endsWith(ending)):
      destination = name.slice(0, name.length - 5);
      isTestToFile = true;
      break;
    case testFilesEndingsCamelCase.some((ending) => name.endsWith(ending)):
      destination = name.slice(0, name.length - 4);
      isTestToFile = true;
      break;
    default:
      destination = name;
      isTestToFile = false;
      break;
  }
  return { destination, isTestToFile };
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("ttd-test-jump.testFileSwitcher", () => {
    const fileObject = path.parse(vscode.window.activeTextEditor?.document.fileName || "");
    const { ext, name } = fileObject;

    const { destination, isTestToFile } = findDestinationFile(name);

    let pattern = "";

    if (!isTestToFile) {
      pattern = `${destination}{_spec,_test,spec,test,Spec,Test,.spec,.test}`;
    } else {
      pattern = destination;
    }
    pattern += ext;

    vscode.workspace.findFiles(`**/*${pattern}`, null, 1).then((fileUri: vscode.Uri[]): void => {
      console.log(fileUri);
      if (fileUri.length === 0) {
        vscode.window.setStatusBarMessage(`🧪: Can't find this pattern ${pattern}`, 3000);
        return;
      }
      vscode.window.setStatusBarMessage(`🧪: Best Match ${pattern}.${ext}`, 3000);
      vscode.commands.executeCommand("vscode.open", vscode.Uri.file(fileUri[0].path));
    });
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
