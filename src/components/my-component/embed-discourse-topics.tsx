import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: "embed-discourse-topics",
})
export class EmbedTopics {
    @Prop() url: string;
    @Prop() numPosts: number;

    render() {
        return (
            <p>
                embedding {this.numPosts} topics for {this.url}
            </p>
        );
    }
}
