import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
    namespace: "embed-discourse",
    plugins: [sass()],
    outputTargets: [
        {
            type: "dist",
            esmLoaderPath: "../loader",
        },
        {
            type: "dist-custom-elements-bundle",
        },
        {
            type: "docs-readme",
        },

        // www is just for viewing it during development
        {
            type: "www",
            serviceWorker: null,
        },
    ],
};
