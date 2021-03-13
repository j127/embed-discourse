import { Discourse, IDiscourseOptions } from "./discourse";

describe("discourse", () => {
    const options: IDiscourseOptions = {
        forumBaseUrl: "https://meta.discourse.org",
        categoryId: 6, // support
        tag: "api",
        numTopics: 4,
    };

    it("creates a discourse object with required fields", () => {
        const discourse = new Discourse(options);

        expect(discourse.categoryId).toBe(6);
        expect(discourse.tag).toBe("api");
        expect(discourse.numTopics).toBe(4);
        expect(discourse.apiUrl).toBe(
            "https://meta.discourse.org/tags/c/6/api.json"
        );
    });

    // TODO add tests for the other methods
});
