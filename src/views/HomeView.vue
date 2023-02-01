<script setup>
import { ref } from "vue";

const listRows = ref([
  { text: "# Welcome" },
  { text: "This is my portfolio, and I hope you will appreciate my art." },
  { text: "ㅤ" },
  { text: "## Introduction" },
  {
    text: 'Currently, I am a student at "Université de Lorraine". To graduate, I need to do an intership (in your company maybe ? 👀)',
  },
  { text: "ㅤ" },
  { text: "## " },
]);
</script>

<template>
  <main>
    <div>
      <div>
        <div>
          <h2>My name is</h2>
          <h3>Bradley Barbier</h3>
          <p>
            After 4 years’ experience in web development, learnt at school and personal time. I’m able to create websites for your company.
            I stay connected about new technologies to use them in my new futures projects.
          </p>
        </div>
      </div>
      <div id="IDE">
        <header>
          <p class="title">README.md</p>
        </header>
        <div class="list-rows">
          <div class="row" v-for="(row, index) in listRows">
            <div class="number">
              <p>{{ index + 1 }}</p>
            </div>
            <p class="text">{{ row.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  padding-top: 50px;
  & > div:first-child {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 600px 600px;
    grid-gap: 50px;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
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
        font-size: 1.3rem;
        font-weight: 300;
        color: $color-font;
      }
    }

    #IDE {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 35px 1fr;

      height: 100%;
      width: 100%;

      background: #292d3e;

      border-radius: 5px;

      &:hover header {
        background: #222;
      }

      header {
        position: relative;
        height: 100%;
        width: 100%;
        background: #2c2c2c;
        border-radius: 5px 5px 0 0;
        transition: background 0.2s ease-in-out;

        .title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }
      }

      .list-rows {
        display: flex;
        flex-direction: column;
        padding: 10px 5px;
        overflow-y: auto;
        height: 220px;
        width: 100%;
        overflow-y: auto;

        .row {
          display: grid;
          grid-template-columns: 20px 1fr;
          grid-gap: 10px;
          font-family: $font-family-mono;

          .number {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
            height: 100%;
            width: 100%;
            overflow: hidden;

            p {
              margin: 0;
              font-size: 0.85rem;
              font-weight: 400;
              color: #4c5063;
            }
          }
          .text {
            margin: 0;
            font-size: 0.85rem;
            font-weight: 400;
            color: #bfc7d5;
          }

          &:hover {
            .number {
              p {
                color: #fff;
              }
            }
            .text {
              background: #212432;
            }
          }
        }
      }
    }
  }
}
</style>
