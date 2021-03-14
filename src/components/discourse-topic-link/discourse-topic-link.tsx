import { Component, Prop, h } from "@stencil/core";
import { IDiscourseTopic } from "../../utils/discourse";

@Component({
    tag: "discourse-topic-link",
    styleUrl: "discourse-topic-link.scss",
    shadow: false,
})
export class DiscourseTopicLink {
    @Prop() topic: IDiscourseTopic;

    // If it's opened in a new window, use the rel attributes by default.
    @Prop() newWindow?: boolean = true;
    @Prop() noreferrer?: boolean = this.newWindow;
    @Prop() noopener?: boolean = this.newWindow;

    generateClasses() {
        const classes = [
            "discourse-topic-link",
            `category-${this.topic.categoryId}`,
        ];
        return classes.join(" ");
    }
    generateTitle() {
        const { postsCount, likeCount } = this.topic;
        const likeString = likeCount === 1 ? "like" : "likes";
        const postsString = postsCount === 1 ? "post" : "posts";

        const strs = [
            `${likeCount} ${likeString}`,
            `${postsCount} ${postsString}`,
        ];

        if (likeCount > 0) {
            return `${strs[1]} and ${strs[0]}`;
        } else {
            return strs[1];
        }
    }

    render() {
        return (
            <li class={this.generateClasses()}>
                <a
                    href={this.topic["url"]}
                    target={this.newWindow ? "_blank" : ""}
                    rel={`${this.noreferrer ? "noreferrer" : ""} ${
                        this.noopener ? "noopener" : ""
                    }`.trim()}
                    data-likes={this.topic.likeCount}
                    data-category-id={this.topic.categoryId}
                    data-posts-count={this.topic.postsCount}
                    title={this.generateTitle()}
                >
                    {this.topic["title"]}
                </a>
            </li>
        );
    }
}
