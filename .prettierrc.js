module.exports = {
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 80,
        proseWrap: 'always'
      }
    }
  ]
}
