# @octo-utils/inkly

create stateful ui fragments for command line output by `React` and [`ink`](https://github.com/vadimdemedes/ink) with vanilla javascript.

## Usage

```javascript
import inkly, { e } from "@octo-utils/inkly"
// const { default: inkly, e } = require("@octo-utils/inkly")

const { release, setState } = inkly((props) => {
  return e(`count: ${props.count}`);
}, { count: 1 });

let count = 1;

setInterval(() => {
    count = count + 1;
    setState({ count });
}, 100);
```

## API

#### inkly(render: (props) => React.Node, initialState: any, optionsRenderInk: any)

#### ReactComponent

`React.Component` same as vanilla one, see https://reactjs.org/docs/react-component.html

#### createReactElement(component: React.Component, props, children)

`React.createElement` same as vanilla one, see https://reactjs.org/docs/react-api.html

you can use this function to create React Element without `jsx`.

beacuse most of time, write small node.js program in vanlla javascript is much easier.

https://reactjs.org/docs/react-without-jsx.html

https://www.pluralsight.com/guides/just-plain-react

#### e(component: string|React.Component, props, children)

wrapper of `React.createElement`, but with a little bit differences;

if you pass string to the first parameter, this function will simply returns a `Text` node.

if you pass array to the first parameter, this function will simply returns a `React.Fragment` node. 

these features may help you write less code.

```javascript
e("Hello")
```

#### ...Components passed from ink

see https://github.com/vadimdemedes/ink#built-in-components for more details

- Box
- Color
- Static
- Text
- StdinContext
- StdoutContext

## built-in-Components

### ProgressBar

progress bar with two styles, just like `wget` provids

```
[=====>      ] # finite style
[        <=> ] # infinite style, if tickSize/total is NaN, will auto use this style
```

##### usage example

```javascript
import inkly, { e, Box, Text } from "@octo-utils/inkly"
import ProgressBar from "@octo-utils/inkly/lib/components/ProgressBar"
import delay from "delay"

const { release, setState } = inkly((props, { i }) => {
  return e(ProgressBar, { ...props, charIncomplete: " " });
}, { width: 30, total: null });

let count = 0;

setInterval(() => {
    count = count + 1;
    setState({ tickSize: count });
}, 100);
```

##### props

- indicatorInfinte: `string` = `"<=>"` indicator when using infinte style
- wrapper: `[string, string]` = `["[", "]"]`
- charComplete: `string` = `"=>"`
- charIncomplete: `string` = `" "`
- width: `number`
- tickSize: `number`
- total: `number`
