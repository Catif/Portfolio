<script setup></script>

<template>
  <footer>
    <p>
      {{ $t("footer.mail.message") }}
      <a href="mailto:bradley.barbier@outlook.fr" target="_blank">
        bradley.barbier@outlook.fr</a>
    </p>

    <p>
      {{ $t("footer.linkedin.message") }}
      <a href="https://www.linkedin.com/in/bradley-barbier/" target="_blank">LinkedIn</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: auto;

  background-color: $color-background-nav;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 50px;
  h2 {
    font-size: 2.3rem;
    font-weight: 600;
    color: $color-font;
  }
}
</style>
