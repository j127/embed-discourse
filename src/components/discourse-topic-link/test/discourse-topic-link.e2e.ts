import { newE2EPage } from "@stencil/core/testing";

describe("discourse-topic-link", () => {
    it("renders", async () => {
        const page = await newE2EPage();
        await page.setContent("<discourse-topic-link></discourse-topic-link>");

        const element = await page.find("discourse-topic-link");
        expect(element).toHaveClass("hydrated");
    });
});
