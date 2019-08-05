## Description

> I created this package as a tool for myself and is under development.

Creates `.scss` files with variables from a `.json`

**Why?** you can share variables between `scss` and `js` without altering bundlers (`webpack`) configurations,
I create this to no be forced to eject `Create React App`

This will translate even very nested `arrays` and `objects`;

> It is also useful for [testing](#testing-component) or creating full application selectors maps.

## Instalation

#### npm
```
npm i -D cra-json-sass
```

#### yarn
```
yarn add -D cra-json-sass
```

## Config

You can config the default values by creating a `config-cra-json-sass.json` file in your package root folder:

This are the default values


```json
{
  "folder": "src",
  "fileExtension": ".scss.json"
}
```


## Usage

You have two binaries that will look into [`config.folder`](#config) for files with [`config.fileExtension`](config) and generate json files

* `yarn cra-json-sass-build`: write all the files and stop.
* `yarn cra-json-sass-watch`: write all the files and keep waiting for file changes.

## BEM tools

If you put the `BEM` key in the **root level** of the `.scss.json` it will follow a chaining.

> inside this `BEM` should be a map of `strings`, if one of the keys matches `parent` key it will not concatenate.

## EXAMPLES

### Source `shared-js-scss.scss.json`

```js
{
  "BEM": { // BEM key
    "Button": {
      "Button": "Button", // block
      "text": "__text",
      "primary": "--primary"
    }
  },
  "isActive": "is-active",
  "animationSpeed" : 0.2,
  "backgroundColor": "green",
  "nested": {
    "color": "red",
    "re-nested": {
      "last-value": "orange"
    }
  },
  "array": [
    "blue",
    {
      "background-color": "red",
      "font-size": "1rem"
    }
  ]
}
```

### Generates `shared-js-scss.scss`

```scss
$Button: Button; // block
$Button__text: Button__text;
$Button--primary: Button--primary;
$isActive: is-active;
$animationSpeed: 0.2;
$backgroundColor: green;
$nested: (
  color: red,
  re-nested: (
   last-value: orange
  )
 );
$array: (
  0: blue,
  1: (
   background-color: red,
   font-size: 1rem
  )
 );

```

### usage in `sample.js`
```js
import sharedWithScss from `./shared.scss.json` // simple json
import `sample-style.scss` // import the styles, not as a module

sharedWithScss.BEM.Button.Button // "Button"
sharedWithScss.BEM.Button.text // "Button__text"
setTimeOut(
  () => console.log('the same time animation takes'),
  sharedWithScss.animationSpeed * 1000)
```

### usage in `sample-style.scss`

```scss
@import "./shared"; //you don't need any extension

.#{$Button} {
  background-color: $backgroundColor;
  transition: all #{$animationSpeed}s;
  color: map-get($nested, color); // red

  &.#{$isActive} { // .Button.is-active
    color: map-get(map-get($nested, re-nested),last-value) // orange
  }

```

### Testing component

```js
import { BEM, isActive } from './shared.scss.json'
import SampleComponent from './component-using-shared-selectors'

// ... mount component with enzyme
const component = mount(<SampleComponent>Text</SampleComponent>)

it(
  `Should Have ${BEM.Button.Button} and ${BEM.Button.primary}`,
  () => {
    expect(component.hasClass(BEM.Button.Button)).toEqual(true)
    expect(component.hasClass(BEM.Button.primary)).toEqual(true)
  }
  );


  const textSelector = `.${BEM.Button.text}`
it(
  `Should Have a inner element ${textSelector}`,
  () => {
    const innerElement = component.find(textSelector)

    expect(innerElement).toHaveLength(1)
  }
  );
```