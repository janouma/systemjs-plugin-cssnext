# Installation

```bash
npm install systemjs-plugin-cssnext
```

# Usage
```javascript
SystemJS.config({
  map: {
    css: 'node_modules/systemjs-plugin-css',
    'plugin-cssnext': 'node_modules/systemjs-plugin-cssnext/index.js',
    postcss: 'node_modules/systemjs-plugin-cssnext/postcss.js',
    'postcss-cssnext': 'node_modules/systemjs-plugin-cssnext/postcss-cssnext.js'
  },

  meta: {
    '*.css': {
      loader: 'plugin-cssnext',

      loaderOptions: {
        // cssnext features config
        features: {
          customProperties: false,
          calc: false
        }
      }
    }
  }
})
```

> **cssnext** features configuration help can be found at [http://cssnext.io/usage/](http://cssnext.io/usage/)