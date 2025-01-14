# hypr.db has reached EOL. Please use [erf.db](https://github.com/erffy/erfdb) instead.

<div>
  <p>
    <a href='https://github.com/erqeweew/hyprdb/actions/workflows/npm.yml'><img src='https://github.com/erffy/hyprdb/actions/workflows/npm.yml/badge.svg'/></a>
    <a href='https://github.com/erqeweew/hyprdb/actions/workflows/github-code-scanning/codeql'><img src='https://github.com/erqeweew/hyprdb/actions/workflows/github-code-scanning/codeql/badge.svg'/></a>
    <br/>
    <a href='https://npmjs.com/hypr.db'><img src='https://img.shields.io/badge/version-v7.1.1-blue'/></a>
    <a href='https://npmjs.com/hypr.db'><img src='https://img.shields.io/badge/license-Apache_2.0-red'/></a>
    <a href='https://npmjs.com/hypr.db'><img src='https://img.shields.io/github/issues/erqeweew/hyprdb'/></a>
    <br/>
    <a href='https://socket.dev/npm/package/hypr.db/issues'><img src='https://socket.dev/api/badge/npm/package/hypr.db'/></a>
  </p>
</div>

# Hyper Database

- Faster, Lightweight and Small Map-based advanced Database.

## [Installation](https://github.com/erffy/hyprdb/wiki#installation)

- We recommend to use [yarn](https://npmjs.com/yarn).
```bash
yarn add hypr.db
```

## [ChangeLog](https://github.com/erqeweew/hyprdb/wiki/Updates)
> News
- Updated README.

- Removed 'autoWrite' option from Database.

> Misc
- Some improvements.

> Fixes
- Interface-import based bugs are fixed.

## Usage

- A simple example is given below.

### Database
```js
// ESM (ECMAScript) (TypeScript)
import Database, { BSONDriver, JSONDriver } from 'hypr.db';

// CJS (Common)
const Database = require('hypr.db');

// Create Database (JSON (Default Options))
const db = new Database();
// Create Database (JSON)
const db = new Database({ driver: new JSONDriver() }); // You can enter the driver options however you want.
// Create Database (BSON)
const db = new Database({ driver: new BSONDriver() }); // You can enter the driver options however you want.

// set & get & del & has & exists
db.set('MyCoolKey', 'MyCoolValue');
db.get('MyCoolKey');
db.del('MyCoolKey');
db.has('MyCoolKey');
db.exists('MyCoolKey'); // Same with has

// find+ & filter & each & map & every & some & search
db.find((value) => value === 'MyCoolValue');
db.findUpdate('MyNewCoolValue', (value) => value === 'MyCoolValue');
db.findDelete((value) => value === 'MyNewCoolValue');
db.filter((value) => value === 'MyNewCoolValue');
db.each((value, key) => typeof db.get(key) === typeof value);
db.map((value, key) => typeof value === 'number');
db.every((value) => value === 'MyCoolValue'),
db.some((value) => value === 'MyCoolValue');
db.search((value) => value === 'MyCoolValue');

// other
db.assign(otherDatabase, 'set'); // Argument 2 is optional.
db.concat([hdb1, hdb2, hdb3, hdb4], hdb3.options); // Argument 2 is optional.
db.type('MyCoolValue');

// array & json
db.json();
const array = db.array();
array.keys();
array.values();

// pull & push
db.push('MyCoolArray', 0, 1, 2);
db.pull('MyCoolArray', (value) => value === 1);

// math
db.math('hyprdb.downloads', '-', 500, true); // Argument 4 is optional.
db.add('hyprdb.downloads', 1); // Argument 2 and 3 is optional.
db.sub('hyprdb.downloads', 1); // Argument 2 and 3 is optional.

// static
Database.checkOptions(db.options); // Argument 1 is optional.

// version
Database.version
```

### DatabaseManager

- Note: This is experimental feature. Some features may not work.

```js
// ESM (ECMAScript) (TypeScript)
import Database, { DatabaseManager } from 'hypr.db';

// CJS (Common)
const { Database, DatabaseManager } = require('hypr.db');

global.mgr = new DatabaseManager();

// Create Databases
const db = new Database();
const db2 = new Database();
const db3 = new Database();
const db4 = new Database();

mgr.set('economy', db);
mgr.set('utils', db2);
mgr.set('storage', db3);
mgr.set('cash', db4);

const getEconomyDatabase = mgr.find((value, key) => key === 'economy'); // Way 1
const getEconomyDatabase = mgr.get('economy'); // Way 2
getEconomyDatabase.set('cash', 50);

// All features same with Database. (Only some functions is removed.)
```
