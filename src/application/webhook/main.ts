import { HttpFunction } from "@google-cloud/functions-framework";
import { ContextIdFactory, NestFactory } from "@nestjs/core";
import { Webhooks } from "@octokit/webhooks";
import { ReleaseEventHandler } from "../release-event-handler.js";
import { AppModule } from "./app.module.js";

// Handle incoming GitHub webhook messages. This is the entrypoint for
// the webhook cloud function.
const handleGithubWebhookEvent: HttpFunction = async (
  request,
  response
) => {
  response.status(200).json({ message: 'Hello from Vercel!' });
  return
  const app = await NestFactory.createApplicationContext(AppModule);

  const webhooks = new Webhooks({ secret: process.env.GITHUB_APP_WEBHOOK_SECRET });
  webhooks.on("release.published", async (event) => {
    // Register the webhook event as the NestJS "request" so that it's available to inject.
    const contextId = ContextIdFactory.create();
    app.registerRequestByContextId(event, contextId);

    const releaseEventHandler = await app.resolve(
      ReleaseEventHandler,
      contextId
    );
    await releaseEventHandler.handle(event);
  });

  await webhooks.verifyAndReceive({
    id: request.headers["x-github-delivery"] as string,
    name: request.headers["x-github-event"] as any,
    payload: request.body,
    signature: request.headers["x-hub-signature-256"] as string,
  });

  await app.close();
  response.status(200).send();
};

export default handleGithubWebhookEvent;

export const test11 = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const event = {
    id: '123456',
    name: 'release',
    payload: {
      action: "published",
      sender: {
        login: 'newbyvector'
      },
      release: {
        html_url: '',
        tag_name: '20241225.0-dev'
      },
      repository: {
        name: 'yacl',
        owner: {
          login: 'newbyvector'
        },
      },
      installation: {}
    }
  } as any;
  const contextId = ContextIdFactory.create();
  app.registerRequestByContextId(event, contextId);

  const releaseEventHandler = await app.resolve(
    ReleaseEventHandler,
    contextId
  );

  await releaseEventHandler.handle(event);
}