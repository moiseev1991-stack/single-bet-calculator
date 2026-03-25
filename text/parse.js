const fs = require('fs')
const path = require('path')

const textDir = path.join('E:', 'cod', 'single-bet-calculator', 'text')

const slugMap = {
  'Single Bet Calculator.txt': 'single',
  'Double Bet Calculator.txt': 'double',
  'Treble Bet Calculator.txt': 'treble',
  'Accumulator Bet Calculator.txt': 'accumulator',
  'Trixie Bet Calculator.txt': 'trixie',
  'Patent Bet Calculator.txt': 'patent',
  'Yankee Bet Calculator.txt': 'yankee',
  'Super Yankee  Calculator.txt': 'super-yankee',
  'Heinz Bet Calculator.txt': 'heinz',
  'Super Heinz Calculator.txt': 'super-heinz',
  'Lucky 15 Calculator.txt': 'lucky-15',
  'Lucky 31 Calculator.txt': 'lucky-31',
  'Lucky 63 Calculator.txt': 'lucky-63',
  'Each Way Bet Calculator.txt': 'each-way',
  'Each Way Double Calculator.txt': 'each-way-double',
  'Rule 4 Deduction Calculator.txt': 'rule-4',
  'Dead Heat Calculator.txt': 'dead-heat',
  'Forecast Bet Calculator.txt': 'forecast',
  'Reverse Forecast Calculator.txt': 'reverse-forecast',
  'Arbitrage Calculator.txt': 'arbitrage',
  'Matched Betting Calculator.txt': 'matched-betting',
  'Dutching Calculator.txt': 'dutch',
  'Kelly Criterion Calculator.txt': 'kelly-criterion',
  'Expected Value Calculator.txt': 'expected-value',
  'Odds Converter.txt': 'odds-converter',
  'Implied Probability Calculator.txt': 'implied-probability',
  'Betting Margin Calculator.txt': 'betting-margin',
  'Sharp Stakes Calculator.txt': 'sharp-stakes',
  'No Vig  Fair Odds Calculator.txt': 'no-vig',
  'Goliath Bet Calculator.txt': 'goliath',
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Convert a chunk of plain text (no headings) into HTML paragraphs/lists
// HTML tables that appear inline are kept as-is
function chunkToHtml(raw) {
  if (!raw.trim()) return ''

  const result = []
  // Split by blank lines, but handle inline HTML tables (single-line)
  const lines = raw.split('\n')
  let current = []

  function flushCurrent() {
    if (!current.length) return
    const blockLines = current.map(l => l.trim()).filter(Boolean)
    current = []
    if (!blockLines.length) return

    // Check if it's a bullet list block
    const hasBullets = blockLines.some(l => l.startsWith('- '))
    if (hasBullets) {
      let pre = []
      let listItems = []
      let inList = false

      for (const bl of blockLines) {
        if (bl.startsWith('- ')) {
          if (!inList && pre.length) {
            result.push(`<p>${pre.join(' ')}</p>`)
            pre = []
          }
          inList = true
          listItems.push(`<li>${bl.slice(2)}</li>`)
        } else {
          if (inList) {
            result.push(`<ul>${listItems.join('')}</ul>`)
            listItems = []
            inList = false
          }
          pre.push(bl)
        }
      }
      if (listItems.length) result.push(`<ul>${listItems.join('')}</ul>`)
      if (pre.length) result.push(`<p>${pre.join(' ')}</p>`)
    } else {
      result.push(`<p>${blockLines.join(' ')}</p>`)
    }
  }

  for (const line of lines) {
    const t = line.trim()
    // Inline HTML table (single line)
    if (t.startsWith('<table')) {
      flushCurrent()
      result.push(t)
    } else if (t === '') {
      flushCurrent()
    } else {
      current.push(line)
    }
  }
  flushCurrent()
  return result.join('\n')
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  let metaTitle = ''
  let metaDescription = ''
  let introLines = []
  let articleParts = [] // raw article sections to build articleHtml

  let state = 'start' // start → post-h1 → intro → article
  let currentChunk = ''

  function pushChunk() {
    if (currentChunk.trim()) {
      articleParts.push({ type: 'chunk', content: currentChunk })
      currentChunk = ''
    }
  }

  for (const line of lines) {
    // Title / Description
    if (/^\*\*Title:\*\*/.test(line)) {
      metaTitle = line.replace(/^\*\*Title:\*\*/, '').trim()
      continue
    }
    if (/^\s*\*\*Description:\*\*/.test(line)) {
      metaDescription = line.replace(/^\s*\*\*Description:\*\*/, '').trim()
      continue
    }

    // H1 — skip
    if (/^# [^#]/.test(line)) {
      state = 'post-h1'
      continue
    }

    // H2
    if (/^## /.test(line)) {
      if (state === 'post-h1' || state === 'intro') {
        // capture intro from what we collected
        state = 'article'
      }
      pushChunk()
      articleParts.push({ type: 'h2', content: line.replace(/^## /, '').trim() })
      continue
    }

    // H3
    if (/^### /.test(line)) {
      pushChunk()
      articleParts.push({ type: 'h3', content: line.replace(/^### /, '').trim() })
      continue
    }

    // Content lines
    if (state === 'post-h1' || state === 'intro') {
      state = 'intro'
      introLines.push(line)
    } else if (state === 'article') {
      currentChunk += line + '\n'
    }
  }
  pushChunk()

  // Build intro: first non-empty paragraph from intro lines
  const introParagraphs = introLines
    .join('\n')
    .split(/\n\s*\n/)
    .map(p => stripHtml(p).trim())
    .filter(Boolean)
  const intro = introParagraphs[0] || ''

  // howItWorks: text body of the first H2 section (before first H3), plain text
  let howItWorks = ''
  let firstH2Idx = articleParts.findIndex(p => p.type === 'h2')
  if (firstH2Idx >= 0) {
    // collect chunks between first H2 and first H3 (or next H2)
    const bodyChunks = []
    for (let i = firstH2Idx + 1; i < articleParts.length; i++) {
      const p = articleParts[i]
      if (p.type === 'h2' || p.type === 'h3') break
      if (p.type === 'chunk') bodyChunks.push(stripHtml(p.content))
    }
    howItWorks = bodyChunks.join(' ').replace(/\s+/g, ' ').trim()
  }

  // Build articleHtml: convert articleParts to HTML
  let articleHtml = ''
  for (const part of articleParts) {
    if (part.type === 'h2') {
      articleHtml += `<h2>${escapeHtml(part.content)}</h2>\n`
    } else if (part.type === 'h3') {
      articleHtml += `<h3>${escapeHtml(part.content)}</h3>\n`
    } else if (part.type === 'chunk') {
      articleHtml += chunkToHtml(part.content) + '\n'
    }
  }

  return { metaTitle, metaDescription, intro, howItWorks, articleHtml: articleHtml.trim() }
}

const results = {}
for (const [filename, slug] of Object.entries(slugMap)) {
  const filePath = path.join(textDir, filename)
  if (fs.existsSync(filePath)) {
    try {
      results[slug] = parseFile(filePath)
      console.log(`✓ ${slug}`)
    } catch (e) {
      console.error(`✗ ${slug}:`, e.message)
    }
  } else {
    console.warn(`Missing: ${filename}`)
  }
}

fs.writeFileSync(
  path.join(textDir, 'parsed.json'),
  JSON.stringify(results, null, 2),
  'utf8'
)
console.log(`\nDone. Parsed ${Object.keys(results).length} calculators → text/parsed.json`)
