## Description

> I created this package as a tool for myself and is under development.

Creates `.scss` files with variables from a `.json`

**Why?** you can share variables between `scss` and `js` without altering bundlers (`webpack`) configurations,
I create this to no be forced to eject `Create React App`

This will translate even very nested `arrays` and `objects`;

## Instalation && config

#### npm
```
npm i -D cra-json-sass
```

#### yarn
```
yarn add -D cra-json-sass
```

You can config the default values by creating a `config-cra-json-config.json` file in your package root folder:

This are the default values

```json
{
  "folder": "src",
  "fileExtension": ".scss.json"
}
```


## Usage

You have two binaries that will look into `config.folder` for files with `config.fileExtension` and generate json files

* `yarn cra-json-sass-build`: write all the files and stop.
* `yarn cra-json-sass-watch`: write all the files and keep waiting for file changes.

## BEM tools

If you put the `BEM` key in the **root level** of the `.scss.json` it will follow a chaining.

> inside this `BEM` should be a map of `strings`, if one of the keys matches `parent` key it will not concatenate.


Better with examples

### Source

```json
{
  "BEM": {
    "Button": {
      "Button": "Button", // block
      "text": "__text",
      "primary": "--primary"
    }
  },
  "isActive": "is-active",
  "animationSpeed" : 0.2,
  "nested": {
    "color": 3,
    "re-nested": {
      "last-value": "miau"
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

### Generates

```scss
$Button: Button; // block
$Button__text: Button__text;
$Button--primary: Button--primary;
$isActive: is-active;
$animationSpeed: 0.2;
$nested: (
  color: 3,
  re-nested: (
   last-value: miau
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

### In js
```js
import sharedWithScss from  `./shared.scss.json`
import from `style.scss`

sharedWithScss.BEM.Button.Button // "Button"
sharedWithScss.BEM.Button.text // "Button__text"
```

WIP...