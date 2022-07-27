import { ISubscriptionContext } from '@microsoft/vscode-azext-utils';
import { AzureAccountTreeItemBase, SubscriptionTreeItemBase } from '@microsoft/vscode-azext-azureutils';
import SubscriptionTreeItem from './subscriptionTreeItem';

export default class AzureAccountTreeItem extends AzureAccountTreeItemBase {
    public createSubscriptionTreeItem(root: ISubscriptionContext): SubscriptionTreeItemBase {
        return new SubscriptionTreeItem(this, root);
    }    
}