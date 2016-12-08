import alias from 'rollup-plugin-strict-alias'
import typescript from 'rollup-plugin-typescript'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
  typescript({
    typescript: require('typescript')
  }),
  alias({
    vue: 'node_modules/vue/dist/vue.common.js'
  }),
  vue({
    css: './dist/build.css'
  }),
  buble({
    objectAssign: 'Object.assign'
  }),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  nodeGlobals()
]

const config = {
  entry: './src/main.ts',
  dest: './dist/build.js',
  sourceMap: true,
  plugins: plugins
}

const isProduction = process.env.NODE_ENV === `production`
const isDevelopment = process.env.NODE_ENV === `development`

if (isProduction) {
  config.sourceMap = false
  config.plugins.push(uglify({}, minify))
}

if (isDevelopment) {
  config.plugins.push(livereload())
  config.plugins.push(serve({
    contentBase: '.',
    port: 8080,
    open: true
  }))
}

export default config
