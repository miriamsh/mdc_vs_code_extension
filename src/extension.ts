import * as vscode from 'vscode';
import { TreeDataProvider } from './TreeDataProvider';
//import { NodeDependenciesProvider } from './nodeDataProvider';




export async function activate(context: vscode.ExtensionContext) {

  const _treeDataProvider=new TreeDataProvider();
  vscode.window.registerTreeDataProvider('package-resources', _treeDataProvider);
  
  vscode.commands.registerCommand('package-resources.refreshEntry', () =>
  _treeDataProvider.refresh()
  );

  // const rootPath =
  //   vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
  //     ? vscode.workspace.workspaceFolders[0].uri.fsPath
  //     : '';
  // const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
  // vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);


}



