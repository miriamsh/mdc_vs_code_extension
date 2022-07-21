import axios, { responseEncoding } from 'axios';
import * as vscode from 'vscode';


export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    private _onDidExpandElement: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidExpandElement: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    
    url: string = 'https://management.azure.com/subscriptions?api-version=2020-01-01';
    _command: string = 'subscription.getSubscriptionsList';

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    //Temporarly, after LogIn to Azure Account, we may get the credentials for this data.
    data!: TreeItem[];
    _token: string;

    constructor() {
        this._token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2NTgzODMzODEsIm5iZiI6MTY1ODM4MzM4MSwiZXhwIjoxNjU4Mzg4MzUwLCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFRBQUFBU3hpWG50MU82RTAraHRCYmZaV1ZuWXRyeGVWR0xlcFN6QklaYTd6WUh3Sjk1Szdhb1V4Lzh0czVUMDhBUmtZNlNESjk1V0p2cnlRdm41OUZFcEQ1b1phYnhhK2pNanROVWdoNFZrbkhFeDg9IiwiYW1yIjpbInJzYSIsIm1mYSJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiZmYyNGY5NWQtZDczZi00ODkyLThlNmUtYWMwM2Q4NWI2N2ZlIiwiZmFtaWx5X25hbWUiOiJGcmFpbWFuIiwiZ2l2ZW5fbmFtZSI6IlNob3NoYW5hIiwiZ3JvdXBzIjpbIjAzZGUzMzJlLWFiMmYtNGUxNC1iNTU4LTllM2E2NDhiNGY4NCIsIjliYWM4MGU2LTdkYWMtNGIyZC05MTNiLTJmNmRhODA5M2MwMSIsIjhmYTFjNDdkLTNhZDctNDdkNi1hNTBjLTQ5YmFkMDZmYjQ2ZCIsIjQwODBmYWY5LTMxNjQtNDdmZS04MzE3LTRkMjgxMTAxMzkzZCIsImQyYTI2YzkxLTYyY2EtNGFlZS04ZTczLTNmYzk1YmIwNTQ1NyIsIjZjOTc2NGMxLWZhZTEtNDI5Ni05MTQ0LWZmMzkwODU2MTk2NCIsImIwMWMxNGE0LWU3NzQtNGQ3Yi1hZTM2LWQ1MjdjYTY1MGVmYyIsIjA1ODdjYmI5LTE4ZWItNDdiNC1iYWU4LTUzN2EyMWViM2M2NiIsImQxYzA1MGIwLTE3MGItNGNjZi1iMWMxLWE0NDA5MTU2NzYxOSIsIjA5NzhmMzk2LTA5MmQtNDNlMy1hMmZkLWE2ZjY5MTEwY2UzOCIsIjdiNTNjNWI3LTgzZDEtNDFjMC05ZmFlLWY3NGJhYWNmMzcxOCIsIjU5MzU2ZmMyLTVjYjAtNDk2My04ODhiLWY0NDE0YWIxMDgyYSIsImRmNGVkYTE1LTZiZjctNDNkYy04ZGZmLTdmODhlMDRjMTc0NSIsImVlODdjYWZlLTQxZWUtNDQwZC1iMzM3LTA5ZjljZTM4ZWEyNyIsIjU4ODAwZWI0LTM5NDAtNDkzNC1iM2ViLWRmZDJhYzY0YTg2MiIsIjlkNTI5ZDVlLWI4ODItNGZmYi1hOGU2LWM0MTQ3YzY4MDczNSIsImJlOGNhMzc4LWJjNzQtNDZjMS1iOTIyLWU3ZjU1MjQ4NmVkZSIsIjIxZjVjY2NhLTFhOTMtNDA2OS05MzUzLTE4YTczOGU2MWNmZiIsImU3YzQzZDAwLTQyMDAtNDRmZS04YmRiLWQ0OGZjNDg0MWUyYSIsIjczYjc0YTFkLTVhZGYtNDM1NS1iNjFlLTljMTFlMTUzZDA1ZCIsImZjYWQwNDc5LTNjMzItNDE3MS1iZWM0LTM1ZmNkOTJmZTljOCIsIjQ4ZTFkNDUyLTQ0OTUtNDVmNC05YWQ3LWYyNDFiYjYwMDI3NSIsIjRiODg2NzBkLTY0ZjktNDUxYy1iZDJkLWNjMjliMWViYjNmYiIsImI2MTI3Mzg2LTEwOTQtNDdkMC05MTk3LTJiNzgzNmE5MDJiZSIsIjhmNDBhZjU1LTU2MTctNDNkMC04MDUyLTI0NDg4ZWRkOWQ2NiIsIjQ4MzBhYTlmLTk5NDYtNDgyNi1iYmE2LTViYzMzNTM1NDc0MyIsIjRiZWNiYmUxLTZhYzYtNGI0Ny1hZDIwLWYwMTdmM2Q2YjA4YiIsIjZmNDM0ODJhLWZhYzUtNDI4Zi1iZWQ3LTU4NWU5OTA3OTEzYyIsIjYyZWRiZDdiLThkNDYtNGQyYy1hNWExLWRhNWI3OGJhMWQzOCIsIjE5MGU3OWExLTVkZDMtNGE0YS04NmFlLTMyYWMzYjE2YThiMyJdLCJpcGFkZHIiOiIxNDcuMjM0LjY0LjMzIiwibmFtZSI6IlNob3NoYW5hIEZyYWltYW4gKEJ1c2luZXNzIEd1ZXN0KSIsIm9pZCI6ImI1YzAzYzg4LTc2YmMtNGU0ZC05NmY3LTZkN2JmOWQxNjJiNCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS03MjA1MTYwNy0xNzQ1NzYwMDM2LTEwOTE4Nzk1Ni0zNTM3NDQiLCJwdWlkIjoiMTAwMzIwMDIxMUQ0REJDQyIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSMFpJZjNrQXV0ZFB1a1Bhd2ZqMk1CTWFBQ0EuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoibi1YWGs1ckFhNmlycjFydE00TUtDLXNBWVBxZGdWUUJJSVVpM2dMZFROcyIsInRpZCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsInVuaXF1ZV9uYW1lIjoiYi1zZnJhaW1hbkBtaWNyb3NvZnQuY29tIiwidXBuIjoiYi1zZnJhaW1hbkBtaWNyb3NvZnQuY29tIiwidXRpIjoidXJXRmRnNkNyRTYtTldtNHFnOFdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc190Y2R0IjoxMjg5MjQxNTQ3fQ.F6X0lbfeRu54VWOGB6z1Gzcq_42lsgFs-pZmmPNHoOyIfx-tWfArCsvVgNfx3XoDipDHq0g_JcH9eis_XZ6Nw73pJn6UREtNricIscceqY2Wve-F4Hywr9JwvDoR0901HY08aUpU-CqM7bFx8BCKbz_80B3tJ_ZffMOHvmBgXj6w2jIRMTJ-GAttUgDPcukPUz7i-_VG9SJ29-L_oEDhR01Td9MXa-JRXgI6Bu6mXnkiz85m9b2lt1_KYJ_uWKwXZms5hgg97YVH6gzKU1yUD_VvrOV7okpKhUJgN-K5ri0nqxiVXs3bkH8GsFzsmtGwSlAgxxhbs2w53ib7hvF0Dg';
    }

    getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: TreeItem | undefined) {
             
        if(this._command==="")
            return null;
        if (element?.command?.command !== undefined)
            vscode.commands.executeCommand(element.command.command, element);

        return await this.getData(element);

        // if (element?.command?.command === "subscription.getSubscriptionsList") {
        //     return this.getSecurityVulnerabilities(element.command.arguments?.at(0));
        // }
        // if (element?.command?.command === "subscription.Recommendentions") {
        //     return await this.getAssesments(element.command.arguments?.at(0));
        // }
        // if (element?.command?.command === "assesment.getAssesmentsList") {
        //     return await this.getSubAssesments(element.command.arguments?.at(0), element.command.arguments?.at(1));
        // }
        // if (element?.command?.command === "subscription.SecurityAlerts") {
        //     return await this.getAlerts(element.command.arguments?.at(0));
        // }

        
    }

    async getData(subscripton?: TreeItem | undefined) {
        if (this.url === "") {
            return [new TreeItem('Recommendentions', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
                command: 'subscription.Recommendentions',
                title: '',
                arguments: [subscripton]
            }),
            new TreeItem('Security Alerts', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
                command: 'subscription.SecurityAlerts',
                title: '',
                arguments: [subscripton]
            }),
            new TreeItem('Connectors', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
                command: 'subscription.connectors',
                title: '',
                arguments: [subscripton]
            })];

        }
        else {
            return await axios.get(this.url, {
                headers: { "Authorization": `Bearer ${this._token}` }
            }).then(response => {
                const dataProvider = response.data.value;
                const c = this._command;
                return dataProvider?.map(function (sub: { "displayName": string, "subscriptionId": string }) {
                    return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
                        command: c,
                        title: '',
                        arguments: [sub],
                    });
                });
            });
        }
    }

    // async getSubscriptions(): Promise<TreeItem[]> {

    //     return await axios.get('https://management.azure.com/subscriptions?api-version=2020-01-01',
    //         {
    //             headers: { "Authorization": `Bearer ${this._token}` }
    //         }).then(response => {
    //             const dataProvider = response.data.value;
    //             return dataProvider.map(function (sub: { "displayName": string, "subscriptionId": string }) {
    //                 return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
    //                     command: 'subscription.getSubscriptionsList',
    //                     title: '',
    //                     arguments: [sub],
    //                 });
    //             });
    //         });
    // }

    // getSecurityVulnerabilities(subscriptionId?: TreeItem | undefined): TreeItem[] {
    //     return [new TreeItem('Recommendentions', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
    //         command: 'subscription.Recommendentions',
    //         title: '',
    //         arguments: [subscriptionId]
    //     }),
    //     new TreeItem('Security Alerts', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
    //         command: 'subscription.SecurityAlerts',
    //         title: '',
    //         arguments: [subscriptionId]
    //     }),
    //     new TreeItem('Connectors', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
    //         command: 'subscription.connectors',
    //         title: '',
    //         arguments: [subscriptionId]
    //     })];
    // }

    // async getAssesments(subscriptionId?: TreeItem | undefined): Promise<TreeItem[]> {
    //     if (subscriptionId !== undefined) {
    //         return await axios.get(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Security/assessments?api-version=2020-01-01`,
    //             {
    //                 headers: { "Authorization": `Bearer ${this._token}` }
    //             }).then(response => {
    //                 const dataProvider = response.data.value;
    //                 return dataProvider.map(function (sub: { "name": string, "displayName": string, "code": { "code": string } }) {
    //                     return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
    //                         command: 'assesment.getAssesmentsList',
    //                         title: '',
    //                         arguments: [subscriptionId],
    //                     });
    //                 });
    //             });
    //     }
    //     return [];
    // }

    // async getSubAssesments(subscriptionId?: string | undefined, assesmnetName?: string | undefined): Promise<TreeItem[]> {
    //     return await axios.get(`https://management.azure.com/${subscriptionId}/providers/Microsoft.Security/assessments/${assesmnetName}/subAssessments?api-version=2019-01-01-preview`,
    //         {
    //             headers: { "Authorization": `Bearer ${this._token}` }
    //         }).then(response => {
    //             const dataProvider = response.data.value;
    //             return dataProvider.map(function (sub: { "displayName": string, "subscriptionId": string }) {
    //                 return new TreeItem(sub.displayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
    //                     command: 'subAssesments.getSubAssesments',
    //                     title: '',
    //                     arguments: [sub.subscriptionId],

    //                 });
    //             });
    //         });
    // }

    // async getAlerts(subscriptionId?: string | undefined): Promise<TreeItem[]> {
    //     return await axios.get(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Security/alerts?api-version=2021-01-01`,
    //         {
    //             headers: { "Authorization": `Bearer ${this._token}` }
    //         }).then(response => {
    //             const dataProvider = response.data.value;
    //             return dataProvider.map(function (sub: { "properties": { "alertDisplayName": string }, }) {
    //                 return new TreeItem(sub.properties.alertDisplayName, "", vscode.TreeItemCollapsibleState.Collapsed, {
    //                     command: 'alerts.getAlert',
    //                     title: '',
    //                     arguments: [sub.properties.alertDisplayName],
    //                 });
    //             });
    //         });
    // }

    // async getConnectors(subscriptionId?: string | undefined): Promise<TreeItem[]> {
    //     return await axios.get(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Security/connectors?api-version=2020-01-01-preview`,
    //         {
    //             headers: { "Authorization": `Bearer ${this._token}` }
    //         }).then(response => {
    //             const dataProvider = response.data.value;
    //             return dataProvider.map(function (sub: { "name": string }) {
    //                 return new TreeItem(sub.name, "", vscode.TreeItemCollapsibleState.Collapsed);
    //             });
    //         });
    // }

    //todo
    //1) add a function for cloudPivder
    //2) add a function for refreshing the token
    //3) rearrange the code-make it generic, etc.
    //4) add icons for each treeItem type

}

export class TreeItem extends vscode.TreeItem {
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

