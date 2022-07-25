// import { registerAzureUtilsExtensionVariables } from '@microsoft/vscode-azext-azureutils';
// import * as vscode from 'vscode';
// import { ExtensionContext, OutputChannel } from 'vscode';
// import { AzExtTreeDataProvider, createAzExtOutputChannel, IAzExtOutputChannel, IAzureUserInput, registerUIExtensionVariables, UIExtensionVariables } from 'vscode-azureextensionui';
// import { AzureAccountTreeItem, WebAppTreeItem } from './TreeDataProvider';
//import { TreeDataProvider, TreeItem } from './TreeDataProvider';



// export async function activate(context: vscode.ExtensionContext) {

  // const _treeDataProvider = new TreeDataProvider();
  // vscode.window.registerTreeDataProvider('package-resources', _treeDataProvider);

  // vscode.commands.registerCommand('package-resources.refreshEntry', () =>
  //   _treeDataProvider.refresh()
  // );

  // vscode.commands.registerCommand('subscription.Recommendentions', async (item: any |undefined) => {
  //  //const treeItems: TreeItem[]=await  _treeDataProvider.getSecurityVulnerabilities(item);

  //   _treeDataProvider.url=`https://management.azure.com/subscriptions/${item.command.arguments?.at(0).command.arguments?.at(0).subscriptionId}/providers/Microsoft.Security/assessments?api-version=2020-01-01`
  //   _treeDataProvider._command="assesment.getAssesmentsList";
  //      // let id=item?.subscriptionId!=undefined?item?.subscriptionId:"";


  //   //  vscode.window.registerTreeDataProvider(, _treeDataProvider);


  // });

  // vscode.commands.registerCommand('subscription.getSubscriptionsList', async (item) => {
  //   _treeDataProvider.url="";
  //   _treeDataProvider._command="subscription.Recommendentions";
  // });

  // vscode.commands.registerCommand('assesment.getAssesmentsList', async (item) => {
  //   _treeDataProvider.url=`https://management.azure.com/${item.subscriptionId}/providers/Microsoft.Security/assessments/${item.assesmnetName}/subAssessments?api-version=2019-01-01-preview`;
  //   _treeDataProvider._command="subAssesments.getSubAssesments";
  // });

  // vscode.commands.registerCommand('subscription.SecurityAlerts', async (item) => {
  //   _treeDataProvider.url=`https://management.azure.com/subscriptions/${item.command.arguments?.at(0).command.arguments?.at(0).subscriptionId}/providers/Microsoft.Security/alerts?api-version=2021-01-01`;
  //   _treeDataProvider._command="alerts.getAlert";
  // });

  // vscode.commands.registerCommand('subscription.connectors', async (item) => {
  //   _treeDataProvider.url=`https://management.azure.com/subscriptions/${item.command.arguments?.at(0).command.arguments?.at(0).subscriptionId}/providers/Microsoft.Security/connectors?api-version=2020-01-01-preview`;
  //   _treeDataProvider._command="";
  // });

  // vscode.commands.registerCommand('subAssesments.getSubAssesments', async (item) => {
  //   _treeDataProvider.url=`https://management.azure.com/${item.subscriptionId}/providers/Microsoft.Security/assessments/${item.assesmnetName}/subAssessments?api-version=2019-01-01-preview`;
  //   _treeDataProvider._command="subAssesments.getSubAssesments";
  // });



  // const azureAccountTreeItem = new AzureAccountTreeItem();
  // context.subscriptions.push(azureAccountTreeItem);
  // const treeDataProvider = new AzExtTreeDataProvider(azureAccountTreeItem, "subscription.getSubscription");
  // context.subscriptions.push(vscode.window.createTreeView("package-resources", { treeDataProvider }));

  // [new WebAppTreeItem('Recommendentions', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
  //                   command: 'subscription.Recommendentions',
  //                   title: '',
  //                   arguments: [subscripton]
  //               }),
  //               new TreeItem('Security Alerts', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
  //                   command: 'subscription.SecurityAlerts',
  //                   title: '',
  //                   arguments: [subscripton]
  //               }),
  //               new TreeItem('Connectors', 'Security vulnerabilities', vscode.TreeItemCollapsibleState.Collapsed, {
  //                   command: 'subscription.connectors',
  //                   title: '',
  //                   arguments: [subscripton]
  //               })];




// }

// function registerUiVariables(context: vscode.ExtensionContext) {
//    extensionVariables=new ExtensionVariables();
//   extensionVariables.outputChannel = vscode.window.createOutputChannel('Azure Pipelines');
//   context.subscriptions.push(extensionVariables.outputChannel);
//   extensionVariables.context = context;
//   extensionVariables.ui = new AzureUserInput(context.globalState);
//   registerUIExtensionVariables(extensionVariables);
// }


// class ExtensionVariables implements UIExtensionVariables {
//   outputChannel!: IAzExtOutputChannel;
//   ignoreBundle?: boolean | undefined;
//   //public azureAccountExtensionApi: AzureAccountExtensionExports | undefined;

//   public context!: ExtensionContext;
//   public ui!: IAzureUserInput;
// }

// let extensionVariables = new ExtensionVariables();
// export { extensionVariables };

// export interface  AzureAccountExtensionExports {
//   sessions: AzureSession[];
//   subscriptions: { session: AzureSession, subscription: SubscriptionModels.Subscription }[];
//   filters: { session: AzureSession, subscription: SubscriptionModels.Subscription }[];
//   waitForLogin: () => Promise<boolean>;
// }













import { AzExtTreeDataProvider, createAzExtOutputChannel, registerUIExtensionVariables } from '@microsoft/vscode-azext-utils';
import * as vscode from 'vscode';
//import { AzExtParentTreeItem, AzExtTreeDataProvider, AzExtTreeItem, createAzExtOutputChannel, registerUIExtensionVariables } from '@microsoft/vscode-azext-utils';
import { AzureAccountTreeItem } from './TreeDataProvider';
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


