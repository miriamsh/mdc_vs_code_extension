import { SecurityCenter } from "@azure/arm-security";
import { Subscription } from "@azure/arm-subscriptions";
import { SubscriptionTreeItemBase } from "@microsoft/vscode-azext-azureutils";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext, ISubscriptionContext } from "@microsoft/vscode-azext-utils";
import { AlertItem } from "./AlertItem";
import { AssessmentItem } from "./AssessmentItem";
import { ConnectorItem } from "./ConnectorItem";

export interface SubscriptionTreeNode {
	readonly nodeType: 'subscription';
	readonly name: string;
	readonly session: ISubscriptionContext;
	readonly subscription: Subscription;
}

export class SubscriptionTreeItem extends SubscriptionTreeItemBase implements SubscriptionTreeNode {

	private _nextLink: string | undefined;
	parent!: AzExtParentTreeItem;
	root!: ISubscriptionContext;
	nodeType!: 'subscription';
	name!: string;
	session!: ISubscriptionContext;
	constructor(
		parent: AzExtParentTreeItem,
		root: ISubscriptionContext) {
		super(parent, root);
		this.root = root;
	}



	public hasMoreChildrenImpl(): boolean {
		return this._nextLink !== undefined;
	}


	public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtTreeItem[]> {
		const client1 = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId,);
		const alerts: AlertItem = new AlertItem(client1.alerts, this, "Security Alerts", this.contextValue);
		const connectors: ConnectorItem = new ConnectorItem(client1.connectors, this, "Connectors", this.contextValue);
		const recommendation: AssessmentItem = new AssessmentItem(client1.assessments, this, "Recommendation", this.contextValue);
		let securityCenter: AzExtTreeItem[] = [recommendation, alerts, connectors];
		
		return securityCenter;


	}

}