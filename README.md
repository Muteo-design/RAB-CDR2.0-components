# RAB CDR2.0 Components

## Download and installation

```
Using your terminal navigate to the folder you want clone the project in
```

```
Run git clone git@github.com:Digitool-Lab/RAB-CDR2.0-components.git
```

```
Run cd RAB-CDR2.0-components
```

```
npm install
```

## Run storybook

```
npm run storybook

```

## Development Notes

### Do not edit files in `/public/cip`
All files in `/public/cip` should only be modified by camslice until such time as he deems another developer has enough context to safely make changes there.

### Coding Style
- Use Tabs for indentation, not spaces. Tab width should equal 4 spaces
- Ensure closing tags exists for all HTML elements that are not "empty elements", otherwise known as "self-closing tags". This includes all Vue components. A few examples of empty elements are: `<img/>`, `<input/>` and `<br/>`. Comprehensive list: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
- 

### CSS
Make all css changes in `/src/assets/css`

There is a build process that prefixes everything with `.rab-cdr` (see `postcss.config.js`) in order to properly scope our styles to the widgets and ensure they are not unintentionally applied to some other rulebook or other part of the UI.

If you're writing CSS like this: `#cloudcase-form .steps { some: thing; }` there's a risk that it will be applied to some other rulebook that uses the .steps class which we are completely unaware of.

If you can't achieve what you need to with the `.rab-cdr` prefix, then the CSS that needs to be written is ultimately Cloudcase's responsibility because it's outside the domain of the widgets. Some of this CSS can be written by us, but at this stage only camslice has enough context to do it safely. It's essentially a global theme update that will apply to all other rulebooks and needs to be done with care and coordination with Cloudcase developers.

Widgets are also rendered on the "staff" channel. The `.rab-cdr` prefix helps us minimise the difference between how the widgets are rendered on the customer channel vs the staff channel.

CSS is integrated into Cloudcase by manually copying the output `<style>` tag from the Storybook and commiting this to the Cloudcase UAT rulebook in a separate Git repository.

#### Bootstrap

Cloudcase global CSS and theme are build on Bootstrap 3.

Boostrap 4 utility classes are made available us via this repo: https://github.com/jbarreiros/bs4-utilities-for-bs3

The utility classes were built from SASS with variable $spacer: 1rem; meaning that fonts and all spacing utilities are using `rem` units. Additional custom utility classes should also use `rem` units.

BS4 utility class documentation: https://getbootstrap.com/docs/4.0/utilities/borders/

#### Icons

All icons are made available via SVG URIs as background images. The staff channel does not have access to community channel assets, so the most reliable way to serve SVG images to both channels is via CSS.

Steps to generate CSS:

1. Export SVG from Figma file, be sure to select entire group. 
1. Optimise and extract markup using https://jakearchibald.github.io/svgomg/
1. Ensure hash `#` prefix on hex colors is escaped as `%23`, eg: `fill="#fff"` becomes `fill="%23fff"`
1. Duplicate existing icon CSS to easily copy correct data URI prefix: `data:image/svg+xml;charset=UTF-8,` 

### Cloudcase Integration

#### Component Registration

Please refer to the comments in `.storybook/preview.js`.  This file is also used as a reference list of all components to be integrated.

Components that are to be integrated into Cloudcase should be registered globally `.storybook/preview.js`. **Note:** Most component will be integrated, apart from presentation templates like `Widget` and `Page` whose sole purpose is to replicate the Cloudcase page layout in Storybook for presentation purposes only.

**The Cloudcase Vue integration is limited to ES5** and does not have a precompile process. The ES6 `import` statement is not supported, so all components are registered globally which makes them available in all other components without an `import` statement. By replicating this behaviour we reduce additional steps required to make components compatible before handoff.

#### Top Level Components (Organisms)

Top level components must use the `.vue` file syntax. All other nested components must use the `.js` syntax.

Top level components must have the `.rab-cdr` class on the root node.

Top level components consume Cloudcase server state and require the `cloudcase-state-mixin.js` to mimic this behaviour in storybook.

Server state must be passed to top level components as a JSON String via the `enteredData` prop as configured in the mixin.

#### ES5 Limitations

Javascript ES5 limitation means certain useful language features are not available, such as:
  - shorthand syntax for method definitions on objects, eg: `{ data() {} }` should be written in longhand as `{ data: function() {} }`

####

Self closing tags - Jason is checking if <img/> throws an error

Ensure code captilisation is retained during integration

Get latest JSON from Jason