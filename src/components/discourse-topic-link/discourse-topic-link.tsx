import { Component, Prop, h } from "@stencil/core";

export interface IDiscourseTopic {
    url: string;
    title: string;
}

@Component({
    tag: "discourse-topic-link",
    styleUrl: "discourse-topic-link.scss",
    shadow: true,
})
export class DiscourseTopicLink {
    @Prop() topic: IDiscourseTopic;

    // If it's opened in a new window, use the rel attributes by default.
    @Prop() newWindow?: boolean = true;
    @Prop() noreferrer?: boolean = this.newWindow;
    @Prop() noopener?: boolean = this.newWindow;

    render() {
        return (
            <li class="discourse-topic-link">
                <a
                    href={this.topic["url"]}
                    target={this.newWindow ? "_blank" : ""}
                    rel={`${this.noreferrer ? "noreferrer" : ""} ${
                        this.noopener ? "noopener" : ""
                    }`}
                >
                    {this.topic["title"]}
                </a>
            </li>
        );
    }
}
