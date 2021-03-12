import { newSpecPage } from "@stencil/core/testing";
import { DiscourseTopicLink } from "../discourse-topic-link";

describe("discourse-topic-link", () => {
    it("renders", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            html: `<discourse-topic-link></discourse-topic-link>`,
        });
        expect(page.root).toEqualHtml(`
      <discourse-topic-link>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </discourse-topic-link>
    `);
    });
});
