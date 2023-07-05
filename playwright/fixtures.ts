import { test as baseTest } from "@playwright/test";
import fs from "fs";
import path from "path";
import { loginData } from "../test-data/login.data";

const domainHost =
  process.env.ENV === "prod"
    ? "https://next.mngppg.co"
    : "https://next.master1.qappg.co";

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id: number = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`,
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      const account = await acquireAccount(id);

      // Perform authentication steps. Replace these actions with your own.
      await page.goto(`${domainHost}/login`);
      await page.locator("input[type='email']").fill(account.username);
      await page.locator("input[type='password']").fill(account.password);
      await page.locator("button[type='submit']").click();
      // Wait until the page receives the cookies.
      //
      // Sometimes login flow sets cookies in the process of several redirects.
      // Wait for the final URL to ensure that the cookies are actually set.
      await page.waitForURL(`${domainHost}/projects`, {
        waitUntil: "load",
      });
      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await page.locator("img[alt='PPG Logo']").waitFor();

      // End of authentication steps.

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});

function acquireAccount(id: number) {
  const accountData = loginData;
  return accountData[id];
}
