<script setup>
const props = defineProps({
  row: Object,
})

const rowFormatedHTML = computed(() => {
  const text = props.row.text

  // Check if the text is a title
  const isTitle = text.startsWith("#")
  if (isTitle) {
    return `<span class="title">${text}</span>`
  }

  // Check if the text is a list
  const isList = text.startsWith("-")
  if (isList) {
    let textList = text.replace("-", "").trim()

    const isBold = textList.startsWith("**")
    if (isBold) {
      const splitText = textList.split("**")
      const textBold = splitText[1]
      const textNormal = splitText[2]
      textList = `<span class="bold">**${textBold}**</span>${textNormal}`
    }

    const htmlList = `<span><span class="list">- </span>${textList}</span>`

    const numberSpace = props.row.numberSpace || 0
    return `<span style="margin-left: ${numberSpace * 10}px">${htmlList}</span>`
  }

  // Check if the text is bold
  const isBold = text.startsWith("**")
  if (isBold) {
    const splitText = text.split("**")
    const textBold = splitText[1]
    const textNormal = splitText[2]
    return `<span><span class="bold">**${textBold}**</span>${textNormal}</span>`
  }

  return text
})
</script>

<template>
  <p
    class="text"
    v-html="rowFormatedHTML"
  />
</template>

<style lang="scss">
p.text {
  .title {
    font-weight: 700;
    color: #79c0ff;
  }

  .list {
    color: #e7a75e;
  }

  .bold {
    font-weight: 700;
  }
}
</style>
