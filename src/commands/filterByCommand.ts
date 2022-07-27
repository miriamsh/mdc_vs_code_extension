import * as vscode from 'vscode';
import { CommandCallback } from 'vscode-azureextensionui';
import { Filtering } from '../Models/filtering';

export async function filterBy(context: vscode.ExtensionContext, key: string, filters: vscode.QuickPickItem[], category: string) {

    try {
        const picks: vscode.QuickPickItem[] | undefined = await vscode.window.showQuickPick(
            filters,
            {
                canPickMany: true,
                placeHolder: `Filter ${category} By...`,
            });
        if (picks) {
            filters.map(f => {
                if (picks.indexOf(f) === -1) {
                    f.picked = false;
                }
            });
            context.globalState.update(`${key}`, filters);
            const filterBy: Filtering = new Filtering(category, picks.map(p => p.label));
        }
    }
    catch (error) {
        throw error;
    }
}

