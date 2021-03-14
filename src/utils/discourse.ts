export interface IDiscourseTopic {
    url: string;
    title: string;
    categoryId: number;
    likeCount: number;
    postsCount: number;
}

export interface IDiscourseOptions {
    forumBaseUrl: string;
    categoryId?: number;
    tag?: string;
    numTopics?: number;
    offset?: number;
}

export class Discourse {
    forumBaseUrl: string;
    categoryId: number;
    tag: string;
    numTopics: number;
    offset: number;
    topics: IDiscourseTopic[];
    apiUrl: string;

    constructor(options: IDiscourseOptions) {
        this.forumBaseUrl = options.forumBaseUrl;
        this.categoryId = options.categoryId;
        this.tag = options.tag;
        this.numTopics = options.numTopics || 5;
        this.offset = options.offset || 0;
        this.apiUrl = this.createDiscourseTopicsUrl();
        this.topics = [];
    }

    createDiscourseTopicsUrl(): string {
        let slug: string;

        if (this.categoryId && this.tag) {
            // both https://forum.example.com/tags/c/8/some-tag.json
            slug = `tags/c/${this.categoryId}/${this.tag}`;
        } else if (this.categoryId) {
            slug = `c/${this.categoryId}`;
        } else if (this.tag) {
            // https://forum.example.com/tag/some-tag.json
            slug = `tag/${this.tag}`;
        } else {
            slug = "latest";
        }

        return `${this.forumBaseUrl}/${slug}.json`;
    }

    createLinkToTopic(topicId: number, slug: string): string {
        return `${this.forumBaseUrl}/t/${slug}/${topicId}`;
    }

    formatTopics(rawTopics: object[]) {
        const result = rawTopics.map((t) => {
            return {
                title: t["title"],
                url: this.createLinkToTopic(t["id"], t["slug"]),
                categoryId: t["category_id"],
                likeCount: t["like_count"],
                postsCount: t["posts_count"],
            };
        });

        return result;
    }

    async getTopics() {
        if (this.topics.length < 1) {
            await this.fetchTopics();
        }
        return this.topics;
    }

    async fetchTopics() {
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            const data = await response.json();

            const rawTopics = data["topic_list"]["topics"].slice(
                this.offset,
                this.offset + this.numTopics
            );
            this.topics = this.formatTopics(rawTopics);
        } catch (err) {
            console.error(`ERROR ${err}`);
        }
    }
}
