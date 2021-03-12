import { Component, Prop, State, Host, h } from "@stencil/core";

@Component({
    tag: "discourse-embed-topics",
    styleUrl: "discourse-embed-topics.scss",
    shadow: true,
})
export class DiscourseEmbedTopics {
    @Prop() forumBaseUrl: string;
    @Prop() numTopics: number = 7;
    @Prop() categoryId?: number;
    @Prop() tag?: string; // I don't think there is a view for multiple tags

    @State() topics: object[];
    @State() fetchError: boolean = false;

    createDiscourseUrl() {
        let slug: string;
        // const categoryIdString = this.categoryId
        //     ? (this.categoryId as string)
        //     : undefined;

        if (this.categoryId && this.tag) {
            // both https://forum.codeselfstudy.com/tags/c/8/vim.json
            slug = `tags/c/${this.categoryId}/${this.tag}`;
        } else if (this.categoryId) {
            slug = `c/${this.categoryId}`;
        } else if (this.tag) {
            // https://forum.codeselfstudy.com/tag/linux.json
            slug = `tag/${this.tag}`;
        } else {
            slug = "latest";
        }
        console.log("slug", slug);
        return `${this.forumBaseUrl}/${slug}.json`;
    }

    createLinkToTopic(topicId: number, slug: string): string {
        return `t/${slug}/${topicId}`;
    }

    async fetchTopics() {
        const url = this.createDiscourseUrl();
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            const data = await response.json();

            const rawTopics = data["topic_list"]["topics"].slice(
                0,
                this.numTopics
            );
            this.topics = this.formatTopics(rawTopics);
        } catch (err) {
            console.error(`ERROR ${err}`);
            this.fetchError = true;
        }
    }

    formatTopics(rawTopics: object[]) {
        const result = rawTopics.map((t) => {
            return {
                title: t["title"],
                url: this.createLinkToTopic(t["id"], t["slug"]),
            };
        });
        console.log("result", result);

        return result;
    }

    componentWillLoad() {
        this.fetchTopics();
    }

    render() {
        return (
            <Host>
                <p>
                    loading {this.numTopics} topics from {this.forumBaseUrl}
                    /latest.json
                </p>
                <div>
                    {this.topics ? (
                        <ul class="discourse-topics">
                            {this.topics.map((t) => (
                                <li>
                                    <a
                                        href={`${this.forumBaseUrl}/${t["url"]}`}
                                        target="_blank"
                                        rel="noreferrer,noopener"
                                    >
                                        {t["title"]}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span class="discourse-loading">Loading&hellip;</span>
                    )}
                </div>
            </Host>
        );
    }
}
// <Host>
//     <slot></slot>
// </Host>
