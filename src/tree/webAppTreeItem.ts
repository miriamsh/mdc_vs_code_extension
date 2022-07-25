import { IActionContext, AzExtTreeItem, AzExtParentTreeItem, ISubscriptionContext } from '@microsoft/vscode-azext-utils';
import { Site } from 'azure-arm-website/lib/models';



export class WebAppTreeItem extends AzExtTreeItem {
    public static contextValue: string = "azureWebApp";
    public readonly contextValue: string = WebAppTreeItem.contextValue;
    private readonly _site: Site;
    constructor(parent: AzExtParentTreeItem, site: Site) {
        super(parent);
        this._site = site;
    }

    public get id(): string {
        return this._site.id!;
    }

    public get label(): string {
        return this._site.name!;
    }
}