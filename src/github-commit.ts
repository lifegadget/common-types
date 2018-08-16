import { IGithubEntity } from "./github";

export interface IGithubCommit {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: {
    url: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      url: string;
      sha: string;
    };
    comment_count: number;
    verification: {
      verified: false;
      reason: string;
      signature: any;
      payload: any;
    };
  };
  author: IGithubEntity;
  committer: IGithubEntity;
  parents: {
    url: string;
    sha: string;
  };
}
