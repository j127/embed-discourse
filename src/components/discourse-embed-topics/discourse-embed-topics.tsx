import { Component, Prop, State, Host, h } from "@stencil/core";
import {
    createDiscourseTopicUrl,
    IDiscourseTopicUrlOptions,
} from "../../utils/discourse";
import { IDiscourseTopic } from "../discourse-topic-link/discourse-topic-link";

@Component({
    tag: "discourse-embed-topics",
    styleUrl: "discourse-embed-topics.scss",
    shadow: true,
})
export class DiscourseEmbedTopics {
    @Prop() forumBaseUrl: string;
    @Prop() numTopics: number = 7;
    @Prop() categoryId?: number;

    // I don't think there is a Discourse view for multiple tags
    @Prop() tag?: string;

    @State() apiUrl: string;
    @State() topics: object[];
    @State() fetchError: boolean = false;

    createLinkToTopic(topicId: number, slug: string): string {
        return `${this.forumBaseUrl}/t/${slug}/${topicId}`;
    }

    async fetchTopics() {
        try {
            const response = await fetch(this.apiUrl);

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
        const options: IDiscourseTopicUrlOptions = {
            forumBaseUrl: this.forumBaseUrl,
            categoryId: this.categoryId,
            tag: this.tag,
        };
        this.apiUrl = createDiscourseTopicUrl(options);
        this.fetchTopics();
    }

    render() {
        return (
            <Host>
                <p>
                    loading {this.numTopics} topics from {this.apiUrl}
                </p>
                <div>
                    {this.topics ? (
                        <ul class="discourse-topics">
                            {this.topics.map((t: IDiscourseTopic) => (
                                <discourse-topic-link
                                    class="discourse-topic-link"
                                    topic={t}
                                ></discourse-topic-link>
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
