


import { AzureAccountTreeItemBase, SubscriptionTreeItemBase } from '@microsoft/vscode-azext-azureutils';
import { IActionContext, AzExtTreeItem, AzExtParentTreeItem, ISubscriptionContext } from '@microsoft/vscode-azext-utils';
import { Subscription } from '@azure/arm-subscriptions';
import { SecurityCenter, Alert, Connectors, Assessments, ConnectorsCreateOrUpdateOptionalParams, ConnectorsDeleteOptionalParams, ConnectorSetting, ConnectorsGetOptionalParams, ConnectorsListOptionalParams, Alerts, AlertsGetResourceGroupLevelOptionalParams, AlertsGetSubscriptionLevelOptionalParams, AlertSimulatorRequestBody, AlertsListByResourceGroupOptionalParams, AlertsListOptionalParams, AlertsListResourceGroupLevelByRegionOptionalParams, AlertsListSubscriptionLevelByRegionOptionalParams, AlertsSimulateOptionalParams, AlertsUpdateResourceGroupLevelStateToActivateOptionalParams, AlertsUpdateResourceGroupLevelStateToDismissOptionalParams, AlertsUpdateResourceGroupLevelStateToResolveOptionalParams, AlertsUpdateSubscriptionLevelStateToActivateOptionalParams, AlertsUpdateSubscriptionLevelStateToDismissOptionalParams, AlertsUpdateSubscriptionLevelStateToResolveOptionalParams, AssessmentsCreateOrUpdateOptionalParams, AssessmentsDeleteOptionalParams, AssessmentsGetOptionalParams, AssessmentsListOptionalParams, SecurityAssessment, SecurityAssessmentResponse } from '@azure/arm-security';
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

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
export class AzureAccountTreeItem extends AzureAccountTreeItemBase {
	public createSubscriptionTreeItem(root: ISubscriptionContext): SubscriptionTreeItemBase {
		return new SubscriptionTreeItem(this, root);
	}
}


export class AlertItem extends AzExtTreeItem implements Alerts {
	public contextValue: string;
	private readonly alerts: Alerts;
	readonly label: string;
	constructor(alerts: Alerts, parent: AzExtParentTreeItem, label: string, contextValue: string) {
		super(parent);
		this.alerts = alerts;
		this.label = label;
		this.contextValue = contextValue;

	}
	list(options?: AlertsListOptionalParams | undefined): PagedAsyncIterableIterator<Alert, Alert[], PageSettings> {
		throw new Error('Method not implemented.');
	}
	listByResourceGroup(resourceGroupName: string, options?: AlertsListByResourceGroupOptionalParams | undefined): PagedAsyncIterableIterator<Alert, Alert[], PageSettings> {
		throw new Error('Method not implemented.');
	}
	listSubscriptionLevelByRegion(ascLocation: string, options?: AlertsListSubscriptionLevelByRegionOptionalParams | undefined): PagedAsyncIterableIterator<Alert, Alert[], PageSettings> {
		throw new Error('Method not implemented.');
	}
	listResourceGroupLevelByRegion(ascLocation: string, resourceGroupName: string, options?: AlertsListResourceGroupLevelByRegionOptionalParams | undefined): PagedAsyncIterableIterator<Alert, Alert[], PageSettings> {
		throw new Error('Method not implemented.');
	}
	getSubscriptionLevel(ascLocation: string, alertName: string, options?: AlertsGetSubscriptionLevelOptionalParams | undefined): Promise<Alert> {
		throw new Error('Method not implemented.');
	}
	getResourceGroupLevel(ascLocation: string, alertName: string, resourceGroupName: string, options?: AlertsGetResourceGroupLevelOptionalParams | undefined): Promise<Alert> {
		throw new Error('Method not implemented.');
	}
	updateSubscriptionLevelStateToDismiss(ascLocation: string, alertName: string, options?: AlertsUpdateSubscriptionLevelStateToDismissOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
	updateSubscriptionLevelStateToResolve(ascLocation: string, alertName: string, options?: AlertsUpdateSubscriptionLevelStateToResolveOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
	updateSubscriptionLevelStateToActivate(ascLocation: string, alertName: string, options?: AlertsUpdateSubscriptionLevelStateToActivateOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
	updateResourceGroupLevelStateToResolve(ascLocation: string, alertName: string, resourceGroupName: string, options?: AlertsUpdateResourceGroupLevelStateToResolveOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
	updateResourceGroupLevelStateToDismiss(ascLocation: string, alertName: string, resourceGroupName: string, options?: AlertsUpdateResourceGroupLevelStateToDismissOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
	updateResourceGroupLevelStateToActivate(ascLocation: string, alertName: string, resourceGroupName: string, options?: AlertsUpdateResourceGroupLevelStateToActivateOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
	simulate(ascLocation: string, alertSimulatorRequestBody: AlertSimulatorRequestBody, options?: AlertsSimulateOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}

}

export class ConnectorItem extends AzExtTreeItem implements Connectors {
	public contextValue: string;
	private readonly connectors: Connectors;

	readonly label: string;


	constructor(connectors: Connectors, parent: AzExtParentTreeItem, label: string, contextValue: string) {
		super(parent);
		this.contextValue = contextValue;
		this.connectors = connectors;

		this.label = label;

	}
	list(options?: ConnectorsListOptionalParams | undefined): PagedAsyncIterableIterator<ConnectorSetting, ConnectorSetting[], PageSettings> {
		throw new Error('Method not implemented.');
	}
	get(connectorName: string, options?: ConnectorsGetOptionalParams | undefined): Promise<ConnectorSetting> {
		throw new Error('Method not implemented.');
	}
	createOrUpdate(connectorName: string, connectorSetting: ConnectorSetting, options?: ConnectorsCreateOrUpdateOptionalParams | undefined): Promise<ConnectorSetting> {
		throw new Error('Method not implemented.');
	}
	delete(connectorName: string, options?: ConnectorsDeleteOptionalParams | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
}



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