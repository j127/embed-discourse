import { newE2EPage } from "@stencil/core/testing";

describe("discourse-embed-topics", () => {
    it("renders", async () => {
        const page = await newE2EPage();
        await page.setContent(
            "<discourse-embed-topics></discourse-embed-topics>"
        );

        const element = await page.find("discourse-embed-topics");
        expect(element).toHaveClass("hydrated");
    });
});
