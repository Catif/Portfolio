<script setup>
import PresentationMe from "./Me.vue"
import PresentationIDE from "./IDE.vue"
</script>

<template>
  <section id="Presentation">
    <PresentationMe />
    <PresentationIDE />
  </section>
</template>

<style lang="scss">
#Presentation {
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  & > div {
    width: 40%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
  }
}

@media (max-width: 1000px) {
  #Presentation {
    flex-direction: column;

    & > div {
      width: 100%;
    }
  }
}
</style>
