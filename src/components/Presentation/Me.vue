<script setup></script>

<template>
  <div id="Me">
    <div>
      <h2>{{ $t("presentation.Me.name") }}</h2>
      <h3>Bradley Barbier</h3>
      <p>{{ $t("presentation.Me.presentation") }}</p>
      <a
        id="download-CV"
        :href="$t('presentation.Me.downloadCVLink')"
        download
        >{{ $t("presentation.Me.downloadCV") }}</a
      >
    </div>
  </div>
</template>

<style lang="scss">
#Me {
  & > div {
    height: 100%;

    h2 {
      font-size: 2.5rem;
      font-weight: 600;
      color: v.$color-font;
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
      color: v.$color-font;
      text-align: justify;
    }

    #download-CV {
      text-align: center;
      display: inline-block;
      width: 100%;
      margin-top: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: v.$color-secondary-background;
      color: v.$color-font;
      font-size: 1.2rem;
      font-weight: 500;
      text-decoration: none;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: color.adjust(
          v.$color-secondary-background,
          $lightness: 5%
        );
      }
    }
  }
}
</style>
