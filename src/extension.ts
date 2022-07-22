'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let spacer = new Spacer();
    let controller = new SpacerController(spacer);

    context.subscriptions.push(controller);
    context.subscriptions.push(spacer);
}

export function deactivate() {}

class Spacer {

    public shouldSpace(position: vscode.Position): boolean {
        const line = vscode.window.activeTextEditor.document.lineAt(position.line).text;
        const textBefore = line.slice(Math.max(position.character - 2, 0), position.character);
        const textAfter = line.slice(position.character + 1, position.character + 3);

        if (textBefore == '{{' && textAfter == '}}') {
            return true;
        } else if (textBefore == '{%' && textAfter.trim() == '}') {
            return true;
        }

        return false;
    }

    public space() {
        const editor = vscode.window.activeTextEditor;

        editor.edit(edit => {
            editor.selections.forEach(selection => {
                const position = selection.active;

                const line = vscode.window.activeTextEditor.document.lineAt(position.line).text;
                const textBefore = line.slice(Math.max(position.character - 2, 0), position.character);
                const textAfter = line.slice(position.character + 1, position.character + 3);

                if (textBefore == '{{' && textAfter == '}}') {
                    edit.replace(new vscode.Range(position.line, position.character + 1, position.line, position.character + 1), " ");
                } else if (textBefore == '{%' && textAfter.trim() == '}') {
                    edit.replace(new vscode.Range(position.line, position.character + 1, position.line, position.character + 1), " %");
                }
            });
        }, {undoStopBefore: false, undoStopAfter: false});

        // move cursors
        editor.selections = editor.selections.map(selection => {
            const position = selection.active;
            const newPosition = new vscode.Position(position.line, position.character + 1);
            const newSelection = new vscode.Selection(newPosition, newPosition);
            return newSelection;
        });
    }

    dispose() {}
}

class SpacerController {
    private _spacer: Spacer;
    private _disposable: vscode.Disposable;
    private _config: vscode.WorkspaceConfiguration;

    constructor(spacer: Spacer) {
        this._spacer = spacer;

        let subscriptions: vscode.Disposable[] = [];
        vscode.workspace.onDidChangeTextDocument(this._onDidChangeTextDocument, this, subscriptions);
        vscode.workspace.onDidChangeConfiguration(this._onDidChangeConfiguration, this, subscriptions);
        this._onDidChangeConfiguration();

        this._disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _considerSpacing() {
        const editor = vscode.window.activeTextEditor;
        if (editor.selections.every(selection => { return this._spacer.shouldSpace(selection.active); })) {
            this._spacer.space();
        }
    }

    private _onDidChangeTextDocument() {
        if (this._config.get("enable", true) && vscode.window.activeTextEditor) {
            this._considerSpacing();
        }
    }

    private _onDidChangeConfiguration() {
        this._config = vscode.workspace.getConfiguration("twig-braces-helper");
    }
}
