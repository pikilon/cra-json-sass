## Description

> I created this package as a tool for myself and is under development.

Creates `.scss` files with variables from a `.json`

**Why?** you can share variables between `scss` and `js` without altering bundlers (`webpack`) configurations,
I create this to no be forced to eject `Create React App`

This will translate even very nested `arrays` and `objects`;

> It is also useful for [testing](#testing-component) or creating full application selectors maps.

![Code Diagram](https://github.com/pikilon/cra-json-sass/raw/master/cra-json-sass.svg?sanitize=true)

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

## EXAMPLES

### Source `shared-js-scss.scss.json`

```js
// tests/basicSample.scss.json

{
  "block": "Button",
  "text": "Button__text",
  "icon": "Button__icon",
  "primary": "Button--primary",
  "secondary": "Button--secondary",
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
// tests/basicSample.scss

$block: Button;
$text: Button__text;
$icon: Button__icon;
$primary: Button--primary;
$secondary: Button--secondary;
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
  blue,
  (
   background-color: red,
   font-size: 1rem
  )
 );

```

### usage in `sample.js`
```js
import sharedWithScss from `./shared.scss.json` // simple json
import `sample-style.scss` // import the styles, not as a module

sharedWithScss.block.Button // "Button"
sharedWithScss.text // "Button__text"
setTimeOut(
  () => console.log('the same time animation takes'),
  sharedWithScss.animationSpeed * 1000)
```

### usage in `sample-style.scss`

```scss
@import "./shared"; //you don't need any extension

.#{$block} {
  background-color: $backgroundColor;
  transition: all #{$animationSpeed}s;
  color: map-get($nested, color); // red

  &.#{$isActive} { // .Button.is-active
    color: map-get(map-get($nested, re-nested),last-value) // orange
  }
.#{$text} {
  display: flex;
}

```

### Testing component

```js
import selectors from './shared.scss.json'

// ... mount component with enzyme
const component = mount(<SampleComponent>Text</SampleComponent>)

it(
  `Should Have ${selectors.block} and ${selectors.primary}`,
  () => {
    expect(component.hasClass(selectors.block)).toEqual(true)
    expect(component.hasClass(selectors.primary)).toEqual(true)
  }
  );

  const textSelector = `.${selectors.text}`
it(
  `Should Have a inner element ${textSelector}`,
  () => {
    const innerElement = component.find(textSelector)

    expect(innerElement).toHaveLength(1)
  }
  );
```