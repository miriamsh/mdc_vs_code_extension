import { AssessmentsMetadata, Assessments, SecurityCenter, SecurityAssessmentResponse } from "@azure/arm-security";
import { AzExtParentTreeItem, IActionContext, TreeItemIconPath } from "@microsoft/vscode-azext-utils";
import EventEmitter = require("events");
import { Command, ThemeIcon } from "vscode";
import { SubAssessmentTreeItem } from "./SubAssessmentsTreeItem";
import { assesmentIcon } from "../constants";

export class AssessmentTreeItem extends AzExtParentTreeItem {
    public label: string;
    private readonly assessments: Assessments;
    private client!: SecurityCenter;
    private command!: Command;


    constructor(label: string, parent: AzExtParentTreeItem) {
        super(parent);
        this.label = label;
        this.client = new SecurityCenter(this.subscription.credentials, this.subscription.subscriptionId);
        this.assessments = this.client.assessments;
        this.iconPath = assesmentIcon;
    }

    public readonly contextValue: string = 'securityCenter.assesments';

    public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtParentTreeItem[]> {

        let assessmentsTree: AzExtParentTreeItem[] = [];
        let subscriptionId = `subscriptions/${this.subscription.subscriptionId}`;
        let value = await (await this.assessments.list(subscriptionId).byPage().next()).value;
        for (let item of value) {
            assessmentsTree.push(new SubAssessmentTreeItem(item.displayName, this, item.name));
        }
        return assessmentsTree;
    }

    public hasMoreChildrenImpl(): boolean {

        return false;
    }



}