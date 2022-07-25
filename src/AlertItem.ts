import { Alert, Alerts, AlertsGetResourceGroupLevelOptionalParams, AlertsGetSubscriptionLevelOptionalParams, AlertSimulatorRequestBody, AlertsListByResourceGroupOptionalParams, AlertsListOptionalParams, AlertsListResourceGroupLevelByRegionOptionalParams, AlertsListSubscriptionLevelByRegionOptionalParams, AlertsSimulateOptionalParams, AlertsUpdateResourceGroupLevelStateToActivateOptionalParams, AlertsUpdateResourceGroupLevelStateToDismissOptionalParams, AlertsUpdateResourceGroupLevelStateToResolveOptionalParams, AlertsUpdateSubscriptionLevelStateToActivateOptionalParams, AlertsUpdateSubscriptionLevelStateToDismissOptionalParams, AlertsUpdateSubscriptionLevelStateToResolveOptionalParams } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem } from "@microsoft/vscode-azext-utils";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

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