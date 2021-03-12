import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "discourse-topic-link",
    styleUrl: "discourse-topic-link.css",
    shadow: true,
})
export class DiscourseTopicLink {
    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }
}
