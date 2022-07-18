import axios from 'axios';
import * as vscode from 'vscode';


export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    //Temporarly, after LogIn to Azure Account, we may get the credentials for this data.
    data!: TreeItem[];
    mdc: TreeItem[];

    constructor() {
        this.mdc = [new TreeItem('Recommendentions', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed),
        new TreeItem('Security Alerts', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed),
        new TreeItem('Connectors', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed)
        ];
    }

    getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: TreeItem | undefined): Promise<TreeItem[]> {
        if (element === undefined) {
            return await this.getData();
        }
        return this.mdc;
    }

    async getData(): Promise<TreeItem[]> {
        return await axios.get("http://localhost:5282/api/Location").then(response => {
            console.log(response.status);
            return [new TreeItem('subscription_1', '', vscode.TreeItemCollapsibleState.Collapsed),
            new TreeItem('subscription_2', '', vscode.TreeItemCollapsibleState.Collapsed),
            new TreeItem('subscription_3', '', vscode.TreeItemCollapsibleState.Collapsed)];
        });
    }
}


class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private version: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }

    iconPath = {
        light: "$(diff-review-insert)",
        dark: "$(diff-review-insert)"
    };
}

