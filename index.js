/* env es6 */
/* global SystemJS */

'use strict'

const CSSPluginBase = require('css/css-plugin-base.js')

const isWin = typeof process !== 'undefined' && process.platform.match(/^win/)
function fromFileURL (url) {
  return url.substr(7 + !!isWin).replace(/\//g, isWin ? '\\' : '/')
}

const features = {
  calc: false,
  customProperties: false,

  // https://npmjs.com/package/postcss-apply
  applyRule: false,

  // https://npmjs.com/package/postcss-calc
  calc: false,

  // https://www.npmjs.com/package/postcss-image-set-polyfill
  imageSet: false,

  // https://npmjs.com/package/postcss-nesting
  nesting: true,

  // https://npmjs.com/package/postcss-custom-media
  customMedia: false,

  // https://npmjs.com/package/postcss-media-minmax
  mediaQueriesRange: false,

  // https://npmjs.com/package/postcss-custom-selectors
  customSelectors: false,

  // https://npmjs.com/package/postcss-attribute-case-insensitive
  attributeCaseInsensitive: false,

  // https://npmjs.com/package/postcss-color-rebeccapurple
  colorRebeccapurple: false,

  // https://npmjs.com/package/postcss-color-hwb
  colorHwb: false,

  // https://npmjs.com/package/postcss-color-hsl
  colorHsl: false,

  // https://npmjs.com/package/postcss-color-rgb
  colorRgb: false,

  // https://npmjs.com/package/postcss-color-gray
  colorGray: false,

  // https://npmjs.com/package/postcss-color-hex-alpha
  colorHexAlpha: false,

  // https://npmjs.com/package/postcss-color-function
  colorFunction: false,

  // https://npmjs.com/package/postcss-font-family-system-ui
  fontFamilySystemUi: false,

  // https://npmjs.com/package/postcss-font-variant
  fontVariant: false,

  // https://npmjs.com/package/pleeease-filters
  filter: false,

  // https://npmjs.com/package/postcss-initial
  initial: false,

  // https://npmjs.com/package/pixrem
  rem: false,

  // https://npmjs.com/package/postcss-pseudoelements
  pseudoElements: false,

  // https://npmjs.com/package/postcss-selector-matches
  pseudoClassMatches: false,

  // https://npmjs.com/package/postcss-selector-not
  pseudoClassNot: false,

  // https://npmjs.com/package/postcss-pseudo-class-any-link
  pseudoClassAnyLink: false,

  // https://npmjs.com/package/postcss-color-rgba-fallback
  colorRgba: false,

  // https://www.npmjs.com/package/postcss-replace-overflow-wrap
  overflowWrap: false,

  // https://npmjs.com/package/autoprefixer
  autoprefixer: false
}

module.exports = new CSSPluginBase(function compile (style, address, opts) {
  const loader = this

  // use a file path in Node and a URL in the browser
  const filename = this.builder ? fromFileURL(address) : address

  return Promise.all([
    SystemJS.import('postcss', module.id),
    SystemJS.import('postcss-cssnext', module.id)
  ])
    .then(([postcss, cssnext]) => postcss([cssnext({ features })]).process(style, { from: filename }))
    .then(({css, map}) => {
      return {
        css: `${css}${loader.builder ? '' : `/*# sourceURL=${filename}*/`}`,
        map,

        // style plugins can optionally return a modular module
        // source as well as the stylesheet above
        moduleSource: null,
        moduleFormat: null
      }
    })
})
