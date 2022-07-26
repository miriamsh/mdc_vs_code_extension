import { SecurityCenter, SubAssessments, } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { ResourceTreeItem } from "./ResourceTreeItem";

export class SubAssessmentTreeItem extends AzExtParentTreeItem {
    public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtTreeItem[]> {
        let subAssessmentsTree: AzExtTreeItem[] = [];
        let subscriptionId = `/subscriptions/${this.subscription.subscriptionId}`;
        let value=await (await this.subAssessments.list(subscriptionId, this.assessmentsName).byPage().next()).value;
        for  (let item of value) {
            subAssessmentsTree.push(new ResourceTreeItem(item.displayName!, this));
        }
        return subAssessmentsTree;
    }
    public hasMoreChildrenImpl(): boolean {
        return false;
    }
    public label: string;
    public contextValue: string;
    public assessmentsName: string;
    private readonly subAssessments: SubAssessments;
    private client!: SecurityCenter;

    constructor(contextValue: string, parent: AzExtParentTreeItem, assessmentsName: string) {
        super(parent);
        this.label = contextValue;
        this.contextValue = contextValue;
        this.assessmentsName = assessmentsName;
		this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
        this.subAssessments = this.client.subAssessments;

    }


}