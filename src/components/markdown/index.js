/*
 * markdown
 */
// https://github.com/jonschlinkert/remarkable
const Remarkable = require('remarkable')
const hljs = require('highlight.js')

export const markdown = new Remarkable({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />)
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks
  linkify: true, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {
        console.log(err)
      }
    }
    try {
      return hljs.highlightAuto(str).value
    } catch (err) {
      console.log(err)
    }
    return str // use external default escaping
  }
})
