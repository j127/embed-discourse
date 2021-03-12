// This file contains helper functions related to Discourse.

export interface IDiscourseTopicUrlOptions {
    forumBaseUrl: string;
    categoryId?: number;
    tag?: string;
}

export function createDiscourseTopicUrl(
    opts: IDiscourseTopicUrlOptions
): string {
    let slug: string;

    if (opts.categoryId && opts.tag) {
        // both https://forum.example.com/tags/c/8/some-tag.json
        slug = `tags/c/${opts.categoryId}/${opts.tag}`;
    } else if (opts.categoryId) {
        slug = `c/${opts.categoryId}`;
    } else if (opts.tag) {
        // https://forum.example.com/tag/some-tag.json
        slug = `tag/${opts.tag}`;
    } else {
        slug = "latest";
    }

    console.log("slug", slug);
    return `${opts.forumBaseUrl}/${slug}.json`;
}
