/* env es6 */
/* global SystemJS */

'use strict'

const CSSPluginBase = require('css/css-plugin-base.js')

const isWin = typeof process !== 'undefined' && process.platform.match(/^win/)
function fromFileURL (url) {
  return url.substr(7 + !!isWin).replace(/\//g, isWin ? '\\' : '/')
}

module.exports = new CSSPluginBase(function compile (style, address, { features = {} }) {
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
