# README

This project contains Stencil web components that load Discourse content in other websites. You can use it with vanilla JS, React, Vue, or any JavaScript project.

## Installation

```
TODO
$ npm install -S
```

### CORS Settings

To load Discourse topics from a domain or subdomain that is different from your Discourse forum, you will need to enable CORS for that domain.

Go to your Discourse settings and search for "cors". Look for the setting called "cors origins". Add the domain of the site that will embed the content there. For example, if you are running this repo in development mode (see below), it runs on `localhost:3333`, so you would add `http://localhost:3333` to "cors origins". That would let your development server load topics from the forum.

Note the help text about the "cors origins" settings where it says that the `DISCOURSE_ENABLE_CORS` env variable must be set to true to enable CORS. You can enable that in your `app.yml` file.

### React

You can use this component in React based projects.

```javascript
import { DiscourseEmbedTopics } from "embed-discourse";

// TODO <discourse-embed-topics forum-base-url="https://forum.example.com" num-topics="7"></discourse-embed-topics>
// camelCase for JSX
```

TODO

### Vue

You can use this component in Vue like this:

TODO

### Vanilla JavaScript

You can use this component in plain JavaScript projects like this:

TODO

### Plain HTML Pages

If you want to embed posts in a plain, static HTML page, you can do it like this:

TODO

## Getting Started

Run in development:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).

### Script tag

-   Put a script tag similar to this `<script src='https://unpkg.com/my-component@0.0.1/dist/my-component.esm.js'></script>` in the head of your index.html
-   Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

-   Run `npm install my-component --save`
-   Put a script tag similar to this `<script src='node_modules/my-component/dist/my-component.esm.js'></script>` in the head of your index.html
-   Then you can use the element anywhere in your template, JSX, html etc
