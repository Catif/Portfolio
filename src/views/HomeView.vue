<script setup></script>

<template>
  <main>
    <div>
      <div>
        <h2>My name is</h2>
        <h3>Bradley Barbier</h3>
        <p>
          After 4 years’ experience in web development, learnt at school and personal time. I’m able to create websites for your company. I
          stay connected about new technologies to use them in my new futures projects.
        </p>
      </div>
      <img />
    </div>
  </main>
</template>

<style lang="scss">
main {
  padding-top: 50px;

  & > div:first-child {
    & > div:first-child {
      margin-left: 10%;

      h2 {
        font-size: 2.5rem;
        font-weight: 600;
        color: $color-font;
      }
      h3 {
        background-position: 50% 50%;
        background-color: #66aeab;
        background-image: url("/img/background-name.gif");
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;

        font-size: 4rem;
        font-weight: 700;
      }
      p {
        margin-top: 10px;
        width: 600px;
        font-size: 1.3rem;
        font-weight: 300;
        color: $color-font;
      }
    }
  }
}
</style>
