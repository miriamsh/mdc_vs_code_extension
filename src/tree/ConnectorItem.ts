import { Connectors, SecurityCenter } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { ResourceTreeItem } from "./ResourceTreeItem";
import { connectorIcon } from '../constants';


export class ConnectorTreeItem extends AzExtParentTreeItem {

    private readonly connectors: Connectors;
    readonly label: string;
    private client!: SecurityCenter;

    constructor(label: string, parent: AzExtParentTreeItem) {
        super(parent);
        this.label = label;
        this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
        this.connectors = this.client.connectors;
        this.iconPath = connectorIcon;
    }

    public readonly contextValue: string = 'securityCenter.connectors';

    public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtTreeItem[]> {

        let connectorsTree: AzExtTreeItem[] = [];
        const value = await (await this.connectors.list().byPage().next()).value;
        for (let item of value) {
            connectorsTree.push(new ResourceTreeItem(item.name!, this));
        }

        return connectorsTree;
    }

    public hasMoreChildrenImpl(): boolean {

        return false;
    }



}