export interface IGithubEvent {
    id: string;
    type: GithubEventType;
    actor: {
        id: number;
        login: string;
        display_login: string;
        gravatar_id: string;
        url: string;
        avatar_url: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    payload: {
        push_id: number;
        size: number;
        distinct_size: number;
        ref: string;
        head: string;
        before: string;
        commits: IGithubEventCommit[];
    };
    public: boolean;
    created_at: string;
}
export interface IGithubEventCommit {
    sha: string;
    author: {
        email: string;
        name: string;
    };
    message: string;
    distinct: boolean;
    url: string;
}
export declare type GithubEventType = "CheckRunEvent" | "CheckSuiteEvent" | "CommitCommentEvent" | "CreateEvent" | "DeleteEvent" | "DeploymentEvent" | "DeploymentStatusEvent" | "DownloadEvent" | "FollowEvent" | "ForkEvent" | "ForkApplyEvent" | "GitHubAppAuthorizationEvent" | "GistEvent" | "GollumEvent" | "InstallationEvent" | "InstallationRepositoriesEvent" | "IssueCommentEvent" | "IssuesEvent" | "LabelEvent" | "MarketplacePurchaseEvent" | "MemberEvent" | "MembershipEvent" | "MilestoneEvent" | "OrganizationEvent" | "OrgBlockEvent" | "PageBuildEvent" | "ProjectCardEvent" | "ProjectColumnEvent" | "ProjectEvent" | "PublicEvent" | "PullRequestEvent" | "PullRequestReviewEvent" | "PullRequestReviewCommentEvent" | "PushEvent" | "ReleaseEvent" | "RepositoryEvent" | "RepositoryVulnerabilityAlertEvent" | "StatusEvent" | "TeamEvent" | "TeamAddEvent" | "WatchEvent";
