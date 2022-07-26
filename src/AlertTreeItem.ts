import { Alerts, SecurityCenter } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { ResourceTreeItem } from "./ResourceTreeItem";

export class AlertTreeItem extends AzExtParentTreeItem {
	public contextValue: string;
	private readonly alerts: Alerts;
	private client!: SecurityCenter;
	public label: string;

	constructor(contextValue: string, parent: AzExtParentTreeItem) {
		super(parent);
		this.label = contextValue;
		this.contextValue = contextValue;
		this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
        this.alerts = this.client.alerts;
	}

	public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtTreeItem[]> {
	
		let alertsTree: AzExtTreeItem[] = [];
		const value=await (await this.alerts.list().byPage().next()).value;
		for  (let item of value) {
			alertsTree.push(new ResourceTreeItem(item.alertDisplayName!, this));
		}
		
		return alertsTree;
	}

	public hasMoreChildrenImpl(): boolean {

		return false;
	}
	



}

