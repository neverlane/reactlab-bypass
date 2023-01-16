# reactlab-bypass

Modern ES6 Promise based bypasser for ReactLab AntiDDoS

| 📖 [Documentation](https://neverlane.github.io/reactlab-bypass/index.html) |
| ------------------------------------------------------------------------- |

<p align="center">
 <a href="https://npmjs.com/package/reactlab-bypass">
   <img src="https://img.shields.io/npm/v/reactlab-bypass?label=version&logo=npm&color=ligthgreen" alt="Version">
 </a>
 <a href="https://npmjs.com/package/reactlab-bypass">
   <img src="https://img.shields.io/npm/dt/reactlab-bypass?&logo=npm" alt="Version">
 </a>
</p>

## Install 📦

```bash
# using npm
npm i reactlab-bypass
# using yarn
yarn add reactlab-bypass
# using pnpm
pnpm add reactlab-bypass
```

## Usage 🔧

Check all available methods in [📖 Documentation](https://neverlane.github.io/reactlab-bypass/index.html).

```js
import { reactLabBypass, resolveCookie } from 'reactlab-bypass'; // ESM
// OR
const { reactLabBypass, resolveCookie } = require('reactlab-bypass'); // CommonJS

// You can bypass by site URL
reactLabBypass({
  host: 'https://arizona-rp.com/'
}).then(({ cookie }) => console.log(`Bypassed cookie: ${cookie}`));
// Or by site HTML
const { cookie } = resolveCookie(`...imagine here reactlab protect page...`);
console.log(`Bypassed cookie: ${cookie}`);
```