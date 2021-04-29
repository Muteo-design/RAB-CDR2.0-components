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

## Cloudcase integration

Please refer to the comments in `.storybook/preview.js`.  This file is also used as a reference list of all components to be integrated.

- Components that are to be integrated into Cloudcase should be registered globally. The Cloudcase Vue integration is limited to ES5 and does not have a precompile process. ES6 imports are not supported, so all components are registered globally. By replicating this behaviour we reduce additional steps required to make components compatible before handoff.
- Top level components that consume Cloudcase server state require the `cloudcase-state-mixin.js` for storybook compatibility.
- Server state must be passed to top level components as a JSON String via the `enteredData` prop as configured in the mixin.
- Javascript ES5 limitation means certain useful language features are not available, such as:
  - shorthand syntax for method definitions on objects, eg: `{ data() {} }` should be written in longhand as `{ data: function() {} }`