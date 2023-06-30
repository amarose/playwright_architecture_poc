import { Page } from "@playwright/test";

export class ExampleComponent {
  constructor(private page: Page) {}

  someLocator = this.page.locator("");
}
