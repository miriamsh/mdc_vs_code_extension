import { Alerts, SecurityCenter } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { ResourceTreeItem } from "./ResourceTreeItem";
import { alertIcon } from "../constants";

export class AlertTreeItem extends AzExtParentTreeItem {
	private readonly alerts: Alerts;
	private client!: SecurityCenter;
	public label: string;

	constructor(label: string, parent: AzExtParentTreeItem) {
		super(parent);
		this.label = label;
 		this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
        this.alerts = this.client.alerts;
		this.iconPath=alertIcon;
	}

	public readonly contextValue: string = 'securityCenter.alerts';

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