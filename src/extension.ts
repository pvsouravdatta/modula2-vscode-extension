import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || event.document !== editor.document) return;

        const changes = event.contentChanges;
        if (changes.length === 0) return;

        const change = changes[0];
        if (![" ", "\n", ";"].includes(change.text)) return;

        // Always check the character before the delimiter for word detection
        let pos = change.range.start;
        let wordRange: vscode.Range | undefined;
        if (pos.character > 0) {
            pos = pos.translate(0, -1);
            wordRange = editor.document.getWordRangeAtPosition(pos);
        } else if (pos.line > 0) {
            // If at start of line, move to end of previous line
            const prevLine = pos.line - 1;
            const prevLineText = editor.document.lineAt(prevLine).text;
            // Find last non-whitespace character
            const match = prevLineText.match(/\S(?=\s*$)/);
            let charIdx = prevLineText.length - 1;
            if (match) {
                charIdx = match.index ?? charIdx;
            }
            pos = new vscode.Position(prevLine, charIdx);
            wordRange = editor.document.getWordRangeAtPosition(pos);
        } else {
            wordRange = editor.document.getWordRangeAtPosition(pos);
        }
        if (!wordRange) return;

        const word = editor.document.getText(wordRange);
        const keywords = [
            "AND", "ARRAY", "BEGIN", "BY", "CASE", "CONST", "DEFINITION", "DIV", "DO",
            "ELSE", "ELSIF", "END", "EXIT", "EXPORT", "EXCEPT", "FINALLY", "FOR", "FROM",
            "GENERIC", "IF", "IMPLEMENTATION", "IMPORT", "IN", "INHERIT", "LOOP",
            "MOD", "MODULE", "NOT", "OF", "OR", "POINTER", "PROCEDURE", "QUALIFIED",
            "REPEAT", "RECORD", "RETURN", "SET", "THEN", "TO", "TYPE", "UNTIL", "VAR",
            "WHILE", "WITH", "AS", "ABSTRACT", "TRACED", "OVERRIDE",
            "UNSAFEGUARDED", "CLASS", "READONLY", "GUARD", "REVEAL",
            "INTEGER", "CARDINAL", "LONGINT", "LONGCARD", "REAL", "LONGREAL",
            "BOOLEAN", "CHAR", "SET", "BITSET", "BYTE", "WORD", "ADDRESS", "PROC",
            "TRUE", "FALSE", "NIL"
        ];

        if (keywords.includes(word.toUpperCase()) && word !== word.toUpperCase()) {
            editor.edit(editBuilder => {
                editBuilder.replace(wordRange!, word.toUpperCase());
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
