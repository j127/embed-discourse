import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { DiscourseTopicLink } from "../discourse-topic-link";
import { IDiscourseTopic } from "../../../utils/discourse";

describe("discourse-topic-link", () => {
    const topic: IDiscourseTopic = {
        url: "https://meta.discourse.org/t/install-plugins-in-discourse/19157",
        title: "Install Plugins in Discourse",
        categoryId: 12,
        likeCount: 5,
        postsCount: 7,
    };

    it("renders a default discourse link", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link topic={topic}></discourse-topic-link>
            ),
        });
        expect(page.root).toEqualHtml(`
            <discourse-topic-link>
                <li class="category-12 discourse-topic-link">
                    <a
                        data-category-id="12"
                        data-likes="5"
                        data-posts-count="7"
                        href="https://meta.discourse.org/t/install-plugins-in-discourse/19157"
                        title="7 posts and 5 likes"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Install Plugins in Discourse
                    </a>
                </li>
            </discourse-topic-link>
        `);
    });

    it("renders a discourse link in same window", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link
                    newWindow={false}
                    topic={topic}
                ></discourse-topic-link>
            ),
        });
        expect(page.root).toEqualHtml(`
            <discourse-topic-link>
                <li class="category-12 discourse-topic-link">
                    <a
                        data-category-id="12"
                        data-likes="5"
                        data-posts-count="7"
                        href="https://meta.discourse.org/t/install-plugins-in-discourse/19157"
                        title="7 posts and 5 likes"
                        target=""
                        rel=""
                    >
                        Install Plugins in Discourse
                    </a>
                </li>
            </discourse-topic-link>
        `);
    });

    it("renders a discourse link in new window with referrer", async () => {
        const page = await newSpecPage({
            components: [DiscourseTopicLink],
            template: () => (
                <discourse-topic-link
                    noreferrer={false}
                    topic={topic}
                ></discourse-topic-link>
            ),
        });
        expect(page.root).toEqualHtml(`
            <discourse-topic-link>
                <li class="category-12 discourse-topic-link">
                    <a
                        data-category-id="12"
                        data-likes="5"
                        data-posts-count="7"
                        href="https://meta.discourse.org/t/install-plugins-in-discourse/19157"
                        title="7 posts and 5 likes"
                        target="_blank"
                        rel="noopener"
                    >
                        Install Plugins in Discourse
                    </a>
                </li>
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
                    topic={topic}
                ></discourse-topic-link>
            ),
        });
        expect(page.root).toEqualHtml(`
            <discourse-topic-link>
                <li class="category-12 discourse-topic-link">
                    <a
                        data-category-id="12"
                        data-likes="5"
                        data-posts-count="7"
                        href="https://meta.discourse.org/t/install-plugins-in-discourse/19157"
                        title="7 posts and 5 likes"
                        target=""
                        rel="noreferrer"
                    >
                        Install Plugins in Discourse
                    </a>
                </li>
            </discourse-topic-link>
        `);
    });
});
