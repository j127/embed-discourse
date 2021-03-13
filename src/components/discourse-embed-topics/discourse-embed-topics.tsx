import { Component, Prop, State, h } from "@stencil/core";
import {
    Discourse,
    IDiscourseTopic,
    IDiscourseOptions,
} from "../../utils/discourse";

@Component({
    tag: "discourse-embed-topics",
    styleUrl: "discourse-embed-topics.scss",
    shadow: false,
})
export class DiscourseEmbedTopics {
    @Prop() forumBaseUrl: string;
    @Prop() numTopics: number = 7;
    @Prop() offset: number; // numTopics + offset should be less than 30
    @Prop() categoryId?: number;

    // I don't think there is a Discourse view for multiple tags
    @Prop() tag?: string;

    @State() topics: IDiscourseTopic[];
    @State() fetchError: boolean = false;

    async componentWillLoad() {
        const options: IDiscourseOptions = {
            forumBaseUrl: this.forumBaseUrl,
            categoryId: this.categoryId,
            tag: this.tag,
            numTopics: this.numTopics,
            offset: this.offset,
        };
        const discourse = new Discourse(options);
        this.topics = await discourse.getTopics();
    }

    render() {
        return (
            <div class="discourse-embed-topics">
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
                        <span class="discourse-loading">
                            <a
                                class="discourse-forum-link"
                                href={this.forumBaseUrl}
                                target="_blank"
                                rel="noopener, nofollow"
                            >
                                Visit the forum
                            </a>
                        </span>
                    )}
                </div>
            </div>
        );
    }
}
