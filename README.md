A super fast utility function to build HTML strings for server side rendering from [`hypnode`](https://github.com/jhdevuk/hypnode) virtual `DOM` references.

# Getting Started

To install `hypnode`, you can use one of the following in your project:

`yarn add hypnode-server` or `npm install hypnode-server`

# Usage

The `render` function can be imported in one of the following ways:

```
import { render } from 'hypnode-server';
```

```
const { render } = require('hypnode-server');
```

To generate a virtual representation of your `DOM` structure, call your `hypnode` functions on the server. This will return an `IVNode` instance that you can pass to the `render` function. For example:

```
import { h } from 'hypnode';
import { render } from 'hypnode-server';
...
const output = h('div', { className: 'wrapper' }, [
   h('p', { title: 'First paragraph' }, 'Lorem ipsum')
]);
...
const result = render(output);
```

or, with `JSX`:

```
import { h } from 'hypnode';
import { render } from 'hypnode-server';
...
const output = (
   <div class="wrapper">
      <p title="First paragraph">Lorem ipsum</p>
   </div>
);
...
const result = render(output);
```

You will now have an `HTML` string that can be returned in a response from your server to render your page.
