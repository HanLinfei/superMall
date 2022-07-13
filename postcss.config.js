module.exports = {
  plugins: {
    autoprefixer: {},
    //适配移动端像素
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/tabBar/]
    }
  }
}
