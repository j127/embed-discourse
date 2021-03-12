import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "discourse-embed-topics",
    styleUrl: "discourse-embed-topics.css",
    shadow: true,
})
export class DiscourseEmbedTopics {
    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }
}
