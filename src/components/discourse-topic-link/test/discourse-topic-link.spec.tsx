import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { DiscourseTopicLink } from "../discourse-topic-link";

describe("discourse-topic-link", () => {
    it("renders a default discourse link", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link
                    topic={{
                        url:
                            "https://meta.discourse.org/t/install-plugins-in-discourse/19157",
                        title: "Install Plugins in Discourse",
                    }}
                ></discourse-topic-link>
            ),
        });
        expect(page.root).toEqualHtml(`
            <discourse-topic-link>
                <mock:shadow-root>
                    <li class="discourse-topic-link">
                        <a href="https://meta.discourse.org/t/install-plugins-in-discourse/19157" target="_blank" rel="noreferrer noopener">Install Plugins in Discourse</a>
                    </li>
                </mock:shadow-root>
            </discourse-topic-link>
        `);
    });
});
