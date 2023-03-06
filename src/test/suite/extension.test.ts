import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { findDestinationFile } from "../../extension";
// import * as myExtension from '../../extension';

suite("Destination function", () => {
  test("Destination should be file.name if test file is file.name.test", () => {
    assert(findDestinationFile("file.name.test").destination, "file.name");
  });
});

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
