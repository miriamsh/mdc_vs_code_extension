import { Connectors, SecurityCenter } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { ResourceTreeItem } from "./ResourceTreeItem";

export class ConnectorTreeItem extends AzExtParentTreeItem {

	public contextValue: string;
	private readonly connectors: Connectors;
	readonly label: string;
	private client!: SecurityCenter;

	constructor(contextValue: string, parent: AzExtParentTreeItem) {
		super(parent);
		this.contextValue = contextValue;
		this.label = contextValue;
		this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
		this.connectors = this.client.connectors;
		this.iconPath="C:/Users/user1/.vscode/extensions/mdc_vs_code_extension-1/src/icons/connector.svg";
		
	}
	
	public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtTreeItem[]> {
	
		let connectorsTree: AzExtTreeItem[] = [];
		const value=await (await this.connectors.list().byPage().next()).value;
		for (let item of value ) {
			connectorsTree.push(new ResourceTreeItem(item.name!, this));
		}
		
		return connectorsTree;
	}
	
	public hasMoreChildrenImpl(): boolean {
	
		return false;
	}
	


}