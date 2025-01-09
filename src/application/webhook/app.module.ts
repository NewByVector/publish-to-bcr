import { Module } from "@nestjs/common";
import { CreateEntryService } from "../../domain/create-entry.js";
import { PublishEntryService } from "../../domain/publish-entry.js";
import { GitClient } from "../../infrastructure/git.js";
import { ReleaseEventHandler } from "../release-event-handler.js";
import {
  APP_OCTOKIT_PROVIDER,
  BCR_APP_OCTOKIT_PROVIDER,
  BCR_GITHUB_CLIENT_PROVIDER,
  RULESET_REPO_GITHUB_CLIENT_PROVIDER,
} from "./providers.js";

@Module({
  providers: [
    GitClient,
    ReleaseEventHandler,
    CreateEntryService,
    PublishEntryService,
    APP_OCTOKIT_PROVIDER,
    BCR_APP_OCTOKIT_PROVIDER,
    RULESET_REPO_GITHUB_CLIENT_PROVIDER,
    BCR_GITHUB_CLIENT_PROVIDER,
  ],
})
export class AppModule {}
