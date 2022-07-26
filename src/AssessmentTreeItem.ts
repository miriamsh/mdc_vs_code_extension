import { AssessmentsMetadata,Assessments, SecurityCenter,SecurityAssessmentResponse } from "@azure/arm-security";
import { AzExtParentTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { SubAssessmentTreeItem } from "./SubAssessmentsTreeItem";

export class AssessmentTreeItem extends AzExtParentTreeItem {
	public label: string;
	public contextValue: string;
	private readonly assessments: Assessments;
	private client!: SecurityCenter;

	constructor(contextValue: string, parent: AzExtParentTreeItem) {
		super(parent);
		this.label = contextValue;
		this.contextValue = contextValue;
		this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
		this.assessments = this.client.assessments;

	}
	public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtParentTreeItem[]> {
	
		let assessmentsTree: AzExtParentTreeItem[] = [];
		let subscriptionId = `subscriptions/${this.subscription.subscriptionId}`;
		let value=await (await this.assessments.list(subscriptionId).byPage().next()).value;
		for(let item of value)
		{
			assessmentsTree.push(new SubAssessmentTreeItem(item.displayName,this,item.name));
		}
		return assessmentsTree;
	}

	public hasMoreChildrenImpl(): boolean {
		
		return false;
	}
	


}