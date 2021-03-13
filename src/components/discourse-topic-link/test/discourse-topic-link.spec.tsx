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

    it("renders a discourse link in same window", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link
                    newWindow={false}
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
                        <a href="https://meta.discourse.org/t/install-plugins-in-discourse/19157" rel=" " target="">Install Plugins in Discourse</a>
                    </li>
                </mock:shadow-root>
            </discourse-topic-link>
        `);
    });

    it("renders a discourse link in new window with referrer", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link
                    noreferrer={false}
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
                        <a href="https://meta.discourse.org/t/install-plugins-in-discourse/19157" rel=" noopener" target="_blank">Install Plugins in Discourse</a>
                    </li>
                </mock:shadow-root>
            </discourse-topic-link>
        `);
    });

    it("renders a discourse link in same window without referrer", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link
                    newWindow={false}
                    noreferrer={true}
                    noopener={false}
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
                        <a href="https://meta.discourse.org/t/install-plugins-in-discourse/19157" rel="noreferrer " target="">Install Plugins in Discourse</a>
                    </li>
                </mock:shadow-root>
            </discourse-topic-link>
        `);
    });
});
