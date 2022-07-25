
import { AzExtTreeDataProvider, createAzExtOutputChannel, registerUIExtensionVariables } from '@microsoft/vscode-azext-utils';
import * as vscode from 'vscode';
import { AzureAccountTreeItem } from './AzureAccountTreeItem';
export async function activate(context: vscode.ExtensionContext) {
const uiExtensionVariables = {
  context,
  ignoreBundle: false,
  outputChannel: createAzExtOutputChannel('Azure Identity', ''),
  prefix: ''
};
registerUIExtensionVariables(uiExtensionVariables);

const azureAccountTreeItem = new AzureAccountTreeItem();
context.subscriptions.push(azureAccountTreeItem);


const treeDataProvider = new AzExtTreeDataProvider(azureAccountTreeItem, "subscription.getSubscription");

context.subscriptions.push(vscode.window.createTreeView("package-resources", { treeDataProvider }));
}


