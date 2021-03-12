# discourse-topic-link



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type              | Default          |
| ------------ | ------------ | ----------- | ----------------- | ---------------- |
| `newWindow`  | `new-window` |             | `boolean`         | `true`           |
| `noopener`   | `noopener`   |             | `boolean`         | `this.newWindow` |
| `noreferrer` | `noreferrer` |             | `boolean`         | `this.newWindow` |
| `topic`      | --           |             | `IDiscourseTopic` | `undefined`      |


## Dependencies

### Used by

 - [discourse-embed-topics](../discourse-embed-topics)

### Graph
```mermaid
graph TD;
  discourse-embed-topics --> discourse-topic-link
  style discourse-topic-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
