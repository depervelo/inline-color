![](https://badgen.net/badge/Editor.js/v2.0/blue)

# InlineColor Tool

Inline Tool for marking code-fragments for the [Editor.js](https://ifmo.su/editor).

![](assets/example.gif)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @editorjs/inline-color
```

Include module at your application

```javascript
const InlineColor = require('@editorjs/inline-color');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

````### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/inline-color).

`https://cdn.jsdelivr.net/npm/@editorjs/inline-color@1.0.1`

Require this script on a page with Editor.js.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    inlineColor: {
      class: InlineColor,
    },
  },

  ...
});
```

## Config Params

This Tool has no config params

## Output data

Marked text will be wrapped with a `span` tag with an `inline-color` class.

```json
{
	"type": "text",
	"data": {
		"text": "Create a directory for your module, enter it and run <span class=\"inline-color\" style="color: rgb(0, 0, 0);background: rbg(0, 0, 0)">npm init</span> command."
	}
}
```
````
