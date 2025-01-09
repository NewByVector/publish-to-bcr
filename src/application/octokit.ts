import { Octokit } from "@octokit/rest";
import { getAppAuthorizedOctokit } from "../infrastructure/github.js";

export async function createAppAuthorizedOctokit(): Promise<Octokit> {
  console.log(process.env.GITHUB_APP_ID, "aaaa");
  return getAppAuthorizedOctokit(
    Number(process.env.GITHUB_APP_ID),
    process.env.GITHUB_APP_PRIVATEKEY,
    process.env.GITHUB_APP_CLIENT_ID,
    process.env.GITHUB_APP_CLIENT_SECRET
  );
}

export async function createBotAppAuthorizedOctokit(
): Promise<Octokit> {
  console.log(process.env.GITHUB_BOT_APP_ID, "bbbb");
  return getAppAuthorizedOctokit(
    Number(process.env.GITHUB_BOT_APP_ID),
    process.env.GITHUB_BOT_APP_PRIVATEKEY,
    process.env.GITHUB_BOT_APP_CLIENT_ID,
    process.env.GITHUB_BOT_APP_CLIENT_SECRET
  );
}