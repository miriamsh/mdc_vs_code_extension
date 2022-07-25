import { Assessments, AssessmentsCreateOrUpdateOptionalParams, AssessmentsDeleteOptionalParams, AssessmentsGetOptionalParams, AssessmentsListOptionalParams, SecurityAssessment, SecurityAssessmentResponse } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem } from "@microsoft/vscode-azext-utils";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

export class AssessmentItem extends AzExtTreeItem implements Assessments {
	public label: string;
	public contextValue: string;
	private readonly assessments: Assessments;
	constructor(assessments: Assessments, parent: AzExtParentTreeItem, label: string, contextValue: string) {
		super(parent);
		this.label = label;
		this.contextValue = contextValue;
		this.assessments = assessments;

	}
	list(scope: string, options?: AssessmentsListOptionalParams | undefined): PagedAsyncIterableIterator<SecurityAssessmentResponse, SecurityAssessmentResponse[], PageSettings> {
		throw new Error('Method not implemented.');
	}
	get(resourceId: string, assessmentName: string, options?: AssessmentsGetOptionalParams | undefined): Promise<SecurityAssessmentResponse> {
		throw new Error('Method not implemented.');
	}
	createOrUpdate(resourceId: string, assessmentName: string, assessment: SecurityAssessment, options?: AssessmentsCreateOrUpdateOptionalParams | undefined): Promise<SecurityAssessmentResponse> {
		throw new Error('Method not implemented.');
	}
	delete(resourceId: string, assessmentName: string, options?: AssessmentsDeleteOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}

}