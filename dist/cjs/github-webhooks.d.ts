import { url, IDictionary } from "./basics";
import { IGithubCommit } from "./github-commit";
import { IGithubRepo, IGithubUser } from "./github";
import { datetime } from "./timing";
export interface IGitHubWebhook_PushEvent {
    /**
     * The full Git ref that was pushed. Example: refs/heads/master.
     */
    ref: string;
    /**
     * The SHA of the most recent commit on ref before the push.
     */
    before: string;
    /**
     * The SHA of the most recent commit on ref after the push.
     */
    after: string;
    created: boolean;
    deleted: boolean;
    forced: boolean;
    base_ref?: any;
    compare: url;
    /**
     * An array of commit objects describing the pushed commits.
     * (The array includes a maximum of 20 commits. If necessary,
     * you can use the Commits API to fetch additional commits.
     * This limit is applied to timeline events only and isn't
     * applied to webhook deliveries.)
     */
    commits: IGithubCommit[];
    head_commit?: any;
    repository: IGithubRepo;
    pusher: {
        name: string;
        email: string;
    };
    sender: IGithubUser;
}
/** https://developer.github.com/webhooks/#events */
export declare type GithubWebhookEvent = "push" | "pull_request" | "check_run" | "check_suite" | "commit_comment" | "create" | "delete" | "deployment" | "deployment_status" | "fork" | "github_app_authorization" | "gollum" | "installation" | "installation_repositories" | "issue_comment" | "issues" | "label" | "marketplace_purchase" | "member" | "membership" | "milestone" | "organization" | "org_block" | "page_build" | "project_card" | "project_column" | "project" | "public" | "pull_request_review_comment" | "pull_request_review" | "repository" | "repository_import" | "repository_volnerability_alert" | "release" | "status" | "team" | "team_add" | "watch";
export interface IGithubWebhookCreate {
    name: "web";
    active: boolean;
    events: GithubWebhookEvent[];
    config: IGithubWebhookConfig;
}
export interface IGithubWebhookConfig {
    /** The URL to which the payloads will be delivered. */
    url: string;
    /**
     * The media type used to serialize the payloads.
     * Supported values include json and form. The default
     * is form.
     */
    content_type?: "json" | "form";
    /** If provided, the secret will be used as the key to generate the HMAC hex digest value in the X-Hub-Signature header. */
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
        /** The URI of the GitHub repository to subscribe to. The path must be in the format of /:owner/:repo/events/:event. */
        topic: string;
        /** The URI to receive the updates to the topic. */
        callback: string;
        /** A shared secret key that generates a SHA1 HMAC of the outgoing body content. You can verify a push came from GitHub by comparing the raw request body with the contents of the X-Hub-Signature header. */
        secret?: string;
    };
}
/**
 * Triggered when an issue is assigned, unassigned, labeled,
 * unlabeled, opened, edited, milestoned, demilestoned, closed,
 * or reopened.
 */
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
/**
 * Triggered when a user is added or removed as a collaborator
 * to a repository, or has their permissions changed.
 */
export interface IGitHubWebhook_MemberEvent {
    action: "added" | "deleted" | "edited";
    member: IGithubUser;
    changes: IDictionary;
    repository: IGithubRepo;
    sender: IGithubUser;
}
/**
 * Triggered when a release is published.
 */
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
/**
 * Triggered when a repository is created, deleted, archived,
 * unarchived, made public, or made private. Organization hooks
 * are also triggered when a repository is deleted.
 */
export interface IGitHubWebhook_RepositoryEvent {
    action: "created" | "deleted" | "archived" | "unarchived" | "publicized" | "privatized";
    repository: IGithubRepo;
    sender: IGithubUser;
}
