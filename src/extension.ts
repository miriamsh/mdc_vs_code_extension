import * as vscode from 'vscode';
import AzureAccountTreeItem from './tree/azureAccountTreeItem';
import { createAzExtOutputChannel, AzExtTreeDataProvider, registerCommand } from '@microsoft/vscode-azext-utils';
import { registerAzureUtilsExtensionVariables } from '@microsoft/vscode-azext-azureutils';
import { filterBy } from './commands/filterByCommand';
import { SeverityFilters, StatusFilters, EnvironmentFilters } from './Models/filters.enum';


export async function activate(context: vscode.ExtensionContext) {

    const uiExtensionVariables = {
        context,
        ignoreBundle: false,
        outputChannel: createAzExtOutputChannel('Azure Identity', ''),
        prefix: ''
    };
    registerAzureUtilsExtensionVariables(uiExtensionVariables);

    const azureAccountTreeItem = new AzureAccountTreeItem();
    context.subscriptions.push(azureAccountTreeItem);
    const treeDataProvider = new AzExtTreeDataProvider(azureAccountTreeItem, 'azureAks.loadMore');

    vscode.window.registerTreeDataProvider('package-resources', treeDataProvider);

    const severityFilters = Object.values(SeverityFilters).filter(f => isNaN(Number(f))).map(filter => {
        return {
            label: `${filter}`,
            description: ` ${filter} level of saverity`,
            picked: true
        };
    });

    const statusFilters = Object.values(StatusFilters).filter(f => isNaN(Number(f))).map(filter => {
        return {
            label: `${filter}`,
            picked: true
        };
    });

    const environmentFilters = Object.values(EnvironmentFilters).filter(f => isNaN(Number(f))).map(filter => {
        return {
            label: `${filter}`,
            description: ` ${filter} cloud`,
            picked: true
        };
    });

    context.globalState.update("severityFilters", severityFilters);

    context.globalState.update("statusFilters", statusFilters);

    context.globalState.update("environmentFilters", environmentFilters);

    context.subscriptions.push(vscode.commands.registerCommand('recommendation.filtering.saverity', async () => {
        filterBy(context, "severityFilters", context.globalState.get("severityFilters")!, "Severity");
    }));

    registerCommand('recommendation.filtering.status', () => {
        filterBy(context, "statusFilters", context.globalState.get("statusFilters")!, "Status");
    });

    registerCommand('recommendation.filtering.cloud', () => {
        filterBy(context, "environmentFilters", context.globalState.get("environmentFilters")!, "Environment");
    });

}
//filtering function
// export async function selectSubscriptions(context: IActionContext): Promise<unknown> {

//     for (const subscription of await subscriptions) {
//         if (subscription.picked !== (picks.indexOf(subscription) !== -1)) {
//             filtersChanged = true;
//             if (subscription.picked) {
//                 removeFilter(resourceFilter, subscription);
//             } else {
//                 addFilter(resourceFilter, subscription);
//             }
//         }
//     }
// }
//function to display the commands with checkboxes
// function getSubscriptionItems(subscriptions: AzureSubscription[], resourceFilter: string[]): ISubscriptionItem[] {
// 	return subscriptions.map(subscription => {
// 		const picked: boolean = resourceFilter.indexOf(`${subscription.session.tenantId}/${subscription.subscription.subscriptionId}`) !== -1 || resourceFilter[0] === 'all';
// 		return <ISubscriptionItem>{
// 			label: subscription.subscription.displayName,
// 			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 			description: subscription.subscription.subscriptionId!,
// 			subscription,
// 			picked,
// 		};
// 	});
// }

// async function updateConfiguration(azureConfig: WorkspaceConfiguration, resourceFilter: string[]): Promise<void> {
// 	const resourceFilterConfig = azureConfig.inspect<string[]>(resourceFilterSetting);
// 	const target: ConfigurationTarget = getCurrentTarget(resourceFilterConfig);
// 	await azureConfig.update(resourceFilterSetting, resourceFilter[0] !== 'all' ? resourceFilter : undefined, target);
// }
export function deactivate() { }




//npm i vscode-azureextensionui
