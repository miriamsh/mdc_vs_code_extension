import * as vscode from 'vscode';
import { TreeDataProvider, TreeItem } from './TreeDataProvider';


export async function activate(context: vscode.ExtensionContext) {

  const _treeDataProvider = new TreeDataProvider();
  vscode.window.registerTreeDataProvider('package-resources', _treeDataProvider);

  vscode.commands.registerCommand('package-resources.refreshEntry', () =>
    _treeDataProvider.refresh()
  );

  vscode.commands.registerCommand('subscription.Recommendentions', async (item: any |undefined) => {
   //const treeItems: TreeItem[]=await  _treeDataProvider.getSecurityVulnerabilities(item);
    
    _treeDataProvider.url=`https://management.azure.com/subscriptions/${item.command.arguments?.at(0).command.arguments?.at(0).subscriptionId}/providers/Microsoft.Security/assessments?api-version=2020-01-01`
    _treeDataProvider._command="assesment.getAssesmentsList";
       // let id=item?.subscriptionId!=undefined?item?.subscriptionId:"";
  

    //  vscode.window.registerTreeDataProvider(, _treeDataProvider);

   
  });

  vscode.commands.registerCommand('subscription.getSubscriptionsList', async (item) => {
    _treeDataProvider.url="";
    _treeDataProvider._command="subscription.Recommendentions";
  });

  vscode.commands.registerCommand('assesment.getAssesmentsList', async (item) => {
    _treeDataProvider.url=`https://management.azure.com/${item.subscriptionId}/providers/Microsoft.Security/assessments/${item.assesmnetName}/subAssessments?api-version=2019-01-01-preview`;
    _treeDataProvider._command="subAssesments.getSubAssesments";
  });

  vscode.commands.registerCommand('subscription.SecurityAlerts', async (item) => {
    _treeDataProvider.url=`https://management.azure.com/subscriptions/${item.command.arguments?.at(0).command.arguments?.at(0).subscriptionId}/providers/Microsoft.Security/alerts?api-version=2021-01-01`;
    _treeDataProvider._command="alerts.getAlert";
  });

  vscode.commands.registerCommand('subscription.connectors', async (item) => {
    _treeDataProvider.url=`https://management.azure.com/subscriptions/${item.command.arguments?.at(0).command.arguments?.at(0).subscriptionId}/providers/Microsoft.Security/connectors?api-version=2020-01-01-preview`;
    _treeDataProvider._command="alerts.getAlert";
  });

  // vscode.commands.registerCommand('subAssesments.getSubAssesments', async (item) => {
  //   _treeDataProvider.url=`https://management.azure.com/${item.subscriptionId}/providers/Microsoft.Security/assessments/${item.assesmnetName}/subAssessments?api-version=2019-01-01-preview`;
  //   _treeDataProvider._command="subAssesments.getSubAssesments";
  // });

 


  

  

}



