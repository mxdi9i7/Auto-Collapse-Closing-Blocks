const vscode = require('vscode');

/**
 * Folds regions of default level and all their inner regions up to level 7.
 * @param resourceUri
 */

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'auto-collapse-blocks.activate',
			foldAllCodeBlocks,
		),
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) {
				foldAllCodeBlocks();
			}
		}),
		vscode.workspace.onDidSaveTextDocument((editor) => {
			if (editor) {
				foldAllCodeBlocks();
			}
		}),
	);
}

function hasCollapsePragma(content) {
	return /^\s*(\/*\*+|\/\/)\s*@collapse/m.test(content);
}

function foldAllCodeBlocks() {
	if (
		vscode.window.activeTextEditor &&
		hasCollapsePragma(vscode.window.activeTextEditor.document.getText())
	) {
		for (let i = 0; i <= 7; i++) {
			vscode.commands.executeCommand(`editor.foldLevel${i}`);
		}
	} else {
		vscode.commands.executeCommand('editor.unfoldAll');
	}
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
