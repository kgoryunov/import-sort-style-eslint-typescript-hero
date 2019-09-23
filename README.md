# import-sort-style-eslint-typescript-hero

A style for [import-sort] that mimics import-sort and typescript-hero sorting
applied one after another with default settings.

```ts
import 'a';
import 'b';
import 'c';

import * as aa from 'aa';
import aaa, { bbb } from 'aaa';
import aaaa from 'aaaa';
import * as bb from 'bb';
import { bbbb } from 'bbbb';
import { ccc, ddd } from 'ccc';
import * as fff from 'eee';

import * as dd from '../dd';
import * as ff from '../ff';
import * as cc from './cc';
import * as ee from './ee';
```

[import-sort]: https://github.com/renke/import-sort

# Installation

- Run `npm install -g import-sort-style-eslint-typescript-hero`
- Create a `.importsortrc` file
  ```json
  {
    ".ts": {
      "style": "/{global_node_modules_path}/import-sort-style-typescript-hero"
    }
  }
  ```
