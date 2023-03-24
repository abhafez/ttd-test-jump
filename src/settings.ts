import * as vscode from "vscode";

export const getTestsDirectories = (): string[] => {
  return vscode.workspace.getConfiguration("tdd-test-jump").get("testsDirectoriesNames")!;
};

