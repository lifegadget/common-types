import { url, datetime, IDictionary } from "./basics";
import { IGithubCommit } from "./github-commit";
import { IGithubRepo, IGithubUser } from "./github";
export interface IGitHubWebhook_PushEvent {
    ref: string;
    before: string;
    after: string;
    created: boolean;
    deleted: boolean;
    forced: boolean;
    base_ref?: any;
    compare: url;
    commits: IGithubCommit[];
    head_commit?: any;
    repository: IGithubRepo;
    pusher: {
        name: string;
        email: string;
    };
    sender: IGithubUser;
}
export declare type GithubWebhookEvent = "push" | "pull_request" | "check_run" | "check_suite" | "commit_comment" | "create" | "delete" | "deployment" | "deployment_status" | "fork" | "github_app_authorization" | "gollum" | "installation" | "installation_repositories" | "issue_comment" | "issues" | "label" | "marketplace_purchase" | "member" | "membership" | "milestone" | "organization" | "org_block" | "page_build" | "project_card" | "project_column" | "project" | "public" | "pull_request_review_comment" | "pull_request_review" | "repository" | "repository_import" | "repository_volnerability_alert" | "release" | "status" | "team" | "team_add" | "watch";
export interface IGithubWebhookCreate {
    name: "web";
    active: boolean;
    events: GithubWebhookEvent[];
    config: IGithubWebhookConfig;
}
export interface IGithubWebhookConfig {
    url: string;
    content_type?: "json" | "form";
    secret?: string;
    insecure_ssl?: 0;
}
export interface IGithubWebhookSubscribe extends IGithubWebhookSubUnsub {
    mode: "subscribe";
}
export interface IGithubWebhookUnsubscribe extends IGithubWebhookSubUnsub {
    mode: "unsubscribe";
}
export interface IGithubWebhookSubUnsub {
    hub: {
        mode: "subscribe" | "unsubscribe";
        topic: string;
        callback: string;
        secret?: string;
    };
}
export interface IGitHubWebhook_IssuesEvent {
    action: "assigned" | "unassigned" | "labeled" | "unlabeled" | "opened" | "edited" | "milestoned" | "demilestoned" | "closed" | "reopened";
    issue: {
        url: string;
        respository_url: string;
        labels_url: string;
        comments_urls: string;
        html_url: string;
        id: number;
        node_id: string;
        number: number;
        title: string;
        user: IGithubUser;
        labels: {
            id: number;
            node_id: string;
            url: string;
            name: string;
            color: string;
            default: boolean;
        };
        state: "open" | string;
        locked: boolean;
        assignee?: any;
        assignees?: any[];
        milestone?: any;
        comments: number;
        created_at: datetime;
        updated_at: datetime;
        closed_at: datetime;
        author_association: "OWNER" | string;
        body: string;
    };
    changes: any;
    repository: IGithubRepo;
    sender: IGithubUser;
}
export interface IGitHubWebhook_MemberEvent {
    action: "added" | "deleted" | "edited";
    member: IGithubUser;
    changes: IDictionary;
    repository: IGithubRepo;
    sender: IGithubUser;
}
export interface IGitHubWebhook_ReleaseEvent {
    action: "published";
    release: {
        url: string;
        assets_url: string;
        upload_url: string;
        html_url: string;
        id: number;
        node_id: string;
        tag_name: string;
        target_commitish: string;
        name?: string;
        draft: boolean;
        author: IGithubUser;
        prerelease: boolean;
        created_at: datetime;
        published_at: datetime;
        assets: any[];
        tarball_url: string;
        zipball_url: string;
        body?: string;
    };
    repository: IGithubRepo;
    sender: IGithubUser;
}
export interface IGitHubWebhook_RepositoryEvent {
    action: "created" | "deleted" | "archived" | "unarchived" | "publicized" | "privatized";
    repository: IGithubRepo;
    sender: IGithubUser;
}
