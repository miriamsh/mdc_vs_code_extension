import { Connectors, ConnectorsCreateOrUpdateOptionalParams, ConnectorsDeleteOptionalParams, ConnectorSetting, ConnectorsGetOptionalParams, ConnectorsListOptionalParams } from "@azure/arm-security";
import { AzExtParentTreeItem, AzExtTreeItem } from "@microsoft/vscode-azext-utils";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
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