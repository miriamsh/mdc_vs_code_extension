import { SecurityCenter } from "@azure/arm-security";
import { SubscriptionTreeItemBase } from "@microsoft/vscode-azext-azureutils";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext, ISubscriptionContext } from "@microsoft/vscode-azext-utils";

import { AlertTreeItem } from "./AlertTreeItem";
import { AssessmentTreeItem } from "./AssessmentTreeItem";
import { ConnectorTreeItem } from "./ConnectorItem";

export class SubscriptionTreeItem extends SubscriptionTreeItemBase {

	private _nextLink: string | undefined;
	parent!: AzExtParentTreeItem;
	root!: ISubscriptionContext;

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

		let recommendation: AssessmentTreeItem = new AssessmentTreeItem("Recommendation", this);
		let alerts: AlertTreeItem = new AlertTreeItem("Security Alerts", this);
		let connectors: ConnectorTreeItem = new ConnectorTreeItem("Connectors", this);

		return [recommendation, alerts, connectors];


	}

}
