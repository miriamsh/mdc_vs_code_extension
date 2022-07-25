import * as vscode from 'vscode';
import AzureAccountTreeItem from './tree/azureAccountTreeItem';
import { createAzExtOutputChannel, AzExtTreeDataProvider, registerCommand, IActionContext } from '@microsoft/vscode-azext-utils';
import { registerAzureUtilsExtensionVariables } from '@microsoft/vscode-azext-azureutils';

export function activate(context: vscode.ExtensionContext) {
    //const cloudExplorer = await k8s.extension.cloudExplorer.v1;
    // context.subscriptions.push(new Reporter(context));
    // setAssetContext(context);


    const uiExtensionVariables = {
        context,
        ignoreBundle: false,
        outputChannel: createAzExtOutputChannel('Azure Identity', ''),
        prefix: ''
    };

    registerAzureUtilsExtensionVariables(uiExtensionVariables);

    //   await registerAzureServiceNodes(context);

    const azureAccountTreeItem = new AzureAccountTreeItem();
    context.subscriptions.push(azureAccountTreeItem);
    const treeDataProvider = new AzExtTreeDataProvider(azureAccountTreeItem, 'azureAks.loadMore');

    vscode.window.registerTreeDataProvider('package-resources', treeDataProvider);

}
export function deactivate() { }




//npm i vscode-azureextensionui
