import { datetime } from "./aliases/timing";
import { IGithubUser } from "./github";

// https://developer.github.com/v3/repos/releases/

export interface IGithubRelease {
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  tarball_url: string;
  zipball_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  created_at: datetime;
  published_at: datetime;
  author: IGithubUser;
  assets: {
    url: string;
    browser_download_url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    state: "uploaded" | string;
    content_type: "application/zip" | string;
    size: number;
    download_count: number;
    created_at: datetime;
    updated_at: datetime;
    uploader: IGithubUser;
  };
}
