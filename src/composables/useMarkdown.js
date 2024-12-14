// composables/useMarkdown.js
// import markdown files and parse them to object
import { ref } from 'vue'

async function importMarkdown(language, file) {
  const response = await fetch('/markdown/' + language + '/' + file + '.md')
  const markdownFile = await response.text()
  return formatMarkdown(markdownFile)
}

function formatMarkdown(markdown) {
  return markdown.split('\n').map((line) => {
    const numberSpace = line.search(/\S|$/)
    return {
      text: line.trim(),
      numberSpace
    }
  })
}

export default function useMarkdown() {
  return {
    importMarkdown
  }
}
