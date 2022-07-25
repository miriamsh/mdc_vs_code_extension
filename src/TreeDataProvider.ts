import axios, { responseEncoding } from 'axios';
import { utimes } from 'fs';
import { EventEmitter } from 'stream';
import * as vscode from 'vscode';


export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private readonly _onDidExpandElement: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>;
    readonly onDidExpandElement: vscode.Event<TreeItem | undefined | null | void> = this._onDidExpandElement.event;

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }


    //Temporarly, after LogIn to Azure Account, we may get the credentials for this data.
    data!: TreeItem[];
    _token: string;

    constructor() {
        this._token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2RhMWQ1YzZkLTc1MjUtNGI5My04NjNiLTE1ODkyNGQ2OThjNy8iLCJpYXQiOjE2NTgzMDYyMjIsIm5iZiI6MTY1ODMwNjIyMiwiZXhwIjoxNjU4MzEwOTg4LCJhY3IiOiIxIiwiYWlvIjoiQVdRQW0vOFRBQUFBOUhxTzRKaEE5QnorYTc3MGt4ZVpISDZOdVNZK1NGQngrUXBhVFdNOUpnQ1lIUmxUdWM0aHY0OWVuakpXc3oxWlJ0MlAyYzNtUlhNdHVxcExtTk1LcU5mbXdYMVU1a0o5bEkzWkkyT2kwdEo5K29nS09PdUI3UU03cndNL1g4eUYiLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwMzAwMDAyODQ1RjlBMiIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiIxOGZiY2ExNi0yMjI0LTQ1ZjYtODViMC1mN2JmMmIzOWIzZjMiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6Ik0wNTI3MTcxNDQzQEdNQUlMLkNPTSIsImZhbWlseV9uYW1lIjoi16nXmNeo16DXkdeo15IiLCJnaXZlbl9uYW1lIjoi157Xmdeo15kiLCJncm91cHMiOlsiMzQ1NTI5MTUtNjg5Yy00MDhhLTk3MzQtZmRlNmRlNzY4NDdhIl0sImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiMzcuNjAuNDcuMjQ2IiwibmFtZSI6Itee15nXqNeZINep15jXqNeg15HXqNeSIiwib2lkIjoiODc1MTViYTgtMTgyMC00YjYzLWE5M2MtMjI1ZjJiOWJjOWZlIiwicHVpZCI6IjEwMDMyMDAyMDA0RjM4Q0EiLCJyaCI6IjAuQVlJQWJWd2QyaVYxazB1R094V0pKTmFZeDBaSWYza0F1dGRQdWtQYXdmajJNQk9WQU1BLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlU4UXNmN0xGTzF3RkQwVWxLeWFTdVBkd25YM1ZjX05ydW5rWGhQZVVlV1kiLCJ0aWQiOiJkYTFkNWM2ZC03NTI1LTRiOTMtODYzYi0xNTg5MjRkNjk4YzciLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI00wNTI3MTcxNDQzQEdNQUlMLkNPTSIsInV0aSI6IkVwaVYwV2dHTEVTUVQtMURmakRMQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfdGNkdCI6MTY1Mzk5NjM4M30.LyBk5Z9FHUxYBQpi8Ot8GZGrxoNhY2364yyQuZdPIu17ma5kQ39-rMG6O2UBhFSLcF2Sm_cLkCvzEfd-l3xiOYdHc9r7C3rD3sddEhnnUMdtwCrhoLp0ijYfVxIEpxyNogNa9AvBw61pcdf-R8-p7Osq_cynuHuHJSFNzaDrjAW1ONRL26zGHRlYQv3gzbtZoNuosJMecV4yWIoRekTkHtiJsffk0_XjUxrcHHbA8MIsulbqOM2UxKE7Mzu3a1G_fwY_FbaIhy1aEIv5Qt4d9j7NDR1vJetBovhOgfA80gREa6tv5r5XxENlgAbxTht0tOKUSM0mNdNY9p3IbARm3w';
    }

    getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: TreeItem | undefined) {
        if (element === undefined) {
            return await this.getSubscriptions();
        }
        if (element?.command?.command === "subscription.getSubscriptionsList") {
            return this.getSecurityVulnerabilities(element.command.arguments?.at(0));
        }
        if (element?.command?.command === "subscription.Recommendentions") {
            return await this.getAssesments(element.command.arguments?.at(0));
        }
        if (element?.command?.command === "assesment.getAssesmentsList") {
            return await this.getSubAssesments(element.command.arguments?.at(0), element.command.arguments?.at(1));
        }
        if (element?.command?.command === "subscription.SecurityAlerts") {
            return await this.getAlerts(element.command.arguments?.at(0));
        }

        return null;
    }

    async getSubscriptions(): Promise<TreeItem[]> {
        return await axios.get('https://management.azure.com/subscriptions?api-version=2020-01-01',
            {
                headers: { "Authorization": `Bearer ${this._token}` }
            }).then(response => {
                const dataProvider = response.data.value;
                return dataProvider.map(function (sub: { "displayName": string, "subscriptionId": string }) {
                    // const item:TreeItem=new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed);
                    // item.command= {
                    //     command: 'subscription.getSubscriptionsList',
                    //     title: '',
                    //     arguments: [item],
                    // };
                    // return item;
                    return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
                        command: 'subscription.getSubscriptionsList',
                        title: '',
                        arguments: [sub.subscriptionId],
                    });
                });
            });
    }

    getSecurityVulnerabilities(subscriptionId?: string | undefined): TreeItem[] {
        return [new TreeItem('Recommendentions', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
            command: 'subscription.Recommendentions',
            title: '',
            arguments: [subscriptionId]
        }),
        new TreeItem('Security Alerts', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
            command: 'subscription.SecurityAlerts',
            title: '',
            arguments: [subscriptionId]
        }),
        new TreeItem('Connectors', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
            command: 'subscription.connectors',
            title: '',
            arguments: [subscriptionId]
        })];
    }

    async getAssesments(subscriptionId?: string | undefined): Promise<TreeItem[]> {
        if (subscriptionId !== undefined) {
            return await axios.get(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Security/assessments?api-version=2020-01-01`,
                {
                    headers: { "Authorization": `Bearer ${this._token}` }
                }).then(response => {
                    const dataProvider = response.data.value;
                    return dataProvider.map(function (sub: { "name": string, "displayName": string, "code": { "code": string } }) {
                        return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
                            command: 'assesment.getAssesmentsList',
                            title: '',
                            arguments: [subscriptionId, sub.name],
                        });
                    });
                });
        }
        return [];
    }

    async getSubAssesments(subscriptionId?: string | undefined, assesmnetName?: string | undefined): Promise<TreeItem[]> {
        return await axios.get(`https://management.azure.com/${subscriptionId}/providers/Microsoft.Security/assessments/${assesmnetName}/subAssessments?api-version=2019-01-01-preview`,
            {
                headers: { "Authorization": `Bearer ${this._token}` }
            }).then(response => {
                const dataProvider = response.data.value;
                return dataProvider.map(function (sub: { "displayName": string, "subscriptionId": string }) {
                    return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
                        command: 'subAssesments.getSubAssesments',
                        title: '',
                        arguments: [sub.subscriptionId],
                    });
                });
            });
    }

    async getAlerts(subscriptionId?: string | undefined): Promise<TreeItem[]> {
        return await axios.get(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Security/alerts?api-version=2021-01-01`,
            {
                headers: { "Authorization": `Bearer ${this._token}` }
            }).then(response => {
                const dataProvider = response.data.value;
                return dataProvider.map(function (sub: { "properties": { "alertDisplayName": string }, }) {
                    return new TreeItem(sub.properties.alertDisplayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
                        command: 'alerts.getAlert',
                        title: '',
                        arguments: [sub.properties.alertDisplayName],
                    });
                });
            });
    }

    async getConnectors(subscriptionId?: string | undefined): Promise<TreeItem[]> {
        return await axios.get(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Security/connectors?api-version=2020-01-01-preview`,
            {
                headers: { "Authorization": `Bearer ${this._token}` }
            }).then(response => {
                const dataProvider = response.data.value;
                return dataProvider.map(function (sub: { "name": string }) {
                    return new TreeItem(sub.name, "", vscode.TreeItemCollapsibleState.Collapsed);
                });
            });
    }

    //todo
    //1) add a function for cloudPivder
    //2) add a function for refreshing the token
    //3) rearrange the code-make it generic, etc.
    //4) add icons for each treeItem type

}

class TreeItem extends vscode.TreeItem {


    constructor(
        public readonly label: string,
        private version: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public command?: vscode.Command
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

