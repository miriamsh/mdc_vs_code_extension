import axios, { responseEncoding } from 'axios';
import * as vscode from 'vscode';


export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    //Temporarly, after LogIn to Azure Account, we may get the credentials for this data.
    data!: TreeItem[];
    _token: string;

    constructor() {
        this._token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2RhMWQ1YzZkLTc1MjUtNGI5My04NjNiLTE1ODkyNGQ2OThjNy8iLCJpYXQiOjE2NTgyMzIxMjEsIm5iZiI6MTY1ODIzMjEyMSwiZXhwIjoxNjU4MjM3NjE5LCJhY3IiOiIxIiwiYWlvIjoiQVdRQW0vOFRBQUFBaGhXcWFrSFJBaFBTNmlPMWpCMzErbE1Bams0RnNzS3o0RkdjbjE5aUFZL2FzR2QxUEtrTnNmK0x3MVZOYlNBcis2SHNNTGhYcFVVUWJjYUlELzFvM2xaNW5BWDZ4SWZXNitZazZGaitIRmJQUkMvYnVGNjVKTXd5UUZESzRQTFAiLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwMzAwMDAyODQ1RjlBMiIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiIxOGZiY2ExNi0yMjI0LTQ1ZjYtODViMC1mN2JmMmIzOWIzZjMiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6Ik0wNTI3MTcxNDQzQEdNQUlMLkNPTSIsImZhbWlseV9uYW1lIjoi16nXmNeo16DXkdeo15IiLCJnaXZlbl9uYW1lIjoi157Xmdeo15kiLCJncm91cHMiOlsiMzQ1NTI5MTUtNjg5Yy00MDhhLTk3MzQtZmRlNmRlNzY4NDdhIl0sImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiOTMuMTczLjU1LjIyNSIsIm5hbWUiOiLXnteZ16jXmSDXqdeY16jXoNeR16jXkiIsIm9pZCI6Ijg3NTE1YmE4LTE4MjAtNGI2My1hOTNjLTIyNWYyYjliYzlmZSIsInB1aWQiOiIxMDAzMjAwMjAwNEYzOENBIiwicmgiOiIwLkFZSUFiVndkMmlWMWswdUdPeFdKSk5hWXgwWklmM2tBdXRkUHVrUGF3ZmoyTUJPVkFNQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJVOFFzZjdMRk8xd0ZEMFVsS3lhU3VQZHduWDNWY19OcnVua1hoUGVVZVdZIiwidGlkIjoiZGExZDVjNmQtNzUyNS00YjkzLTg2M2ItMTU4OTI0ZDY5OGM3IiwidW5pcXVlX25hbWUiOiJsaXZlLmNvbSNNMDUyNzE3MTQ0M0BHTUFJTC5DT00iLCJ1dGkiOiJfOHJ1NWNWUmRrcXpqR2MxclFWWUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3RjZHQiOjE2NTM5OTYzODN9.PRrzULM9Se7fMuNkNK7hxkvldxb313pjKEwaUtsoWyN_TSu5jmiEVc2MCQSOoze6qQqFzOUVIqK69v3zvWHFboFyveE7fDPy9bLwismwbGQT8DOSAxOPvl_xNLUtGJYSe8jYBKQ90Fy89XvgmvAk12RJ1DssSLngloxfiqxKohOyonyq5bH0d6NHuzYmvkr5d3j7fkRY8su8WdZLz2OepTd83W3eoAUEMxZKXjaSM-BfLQzGzrduHl_gefpL7lKuSt2gNDy8i_jDqIykThpAD5pw2Vu818Jed2_NMmWMXVDg_HPniOnz0pyHEKBr7kyuRoBRh1YxrrUwQ76ijKaMVA';
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
                return dataProvider.map(function (sub: { "name": string}) {
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
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
        this.command = command;
    }


    iconPath = {
        light: "$(diff-review-insert)",
        dark: "$(diff-review-insert)"
    };
}

