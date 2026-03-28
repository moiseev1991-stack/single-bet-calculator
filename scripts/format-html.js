const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').html

const OUT_DIR = path.join(__dirname, '..', 'out')

const options = {
  indent_size: 2,
  indent_char: ' ',
  max_preserve_newlines: 1,
  preserve_newlines: false,
  wrap_line_length: 0,
  end_with_newline: true,
  content_unformatted: ['script', 'style'],
  extra_liners: ['head', 'body', '/html'],
  indent_inner_html: true,
}

function formatHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      formatHtmlFiles(fullPath)
    } else if (entry.name.endsWith('.html')) {
      const original = fs.readFileSync(fullPath, 'utf8')
      const formatted = beautify(original, options)
      fs.writeFileSync(fullPath, formatted, 'utf8')
      console.log('Formatted:', path.relative(OUT_DIR, fullPath))
    }
  }
}

formatHtmlFiles(OUT_DIR)
console.log('HTML formatting complete.')
