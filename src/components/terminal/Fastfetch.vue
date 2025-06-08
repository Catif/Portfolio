<script setup>
const infos = [
  {
    property: "Age",
    value: "23",
  },
  {
    property: "Location",
    value: "Nancy, FRANCE",
  },
  {
    property: "Language",
    value: "French, English",
  },
  {
    property: "Hobbies",
    value: "Coding, Chess, Running, Mountain Biking",
  },
  {
    property: "Interests",
    value: "Web Development, Chess,",
  },
  {
    property: "Contact",
    value:
      "<a href='mailto:bradley.barbier@outlook.fr'>bradley.barbier@outlook.fr</a>",
  },
  {
    property: "GitHub",
    value: "<a href='https://github.com/catif'>https://github.com/catif</a>",
  },
  {
    property: "LinkedIn",
    value:
      "<a href='https://www.linkedin.com/in/bradley-barbier/'>bradley-barbier</a>",
  },
]
</script>

<template>
  <div class="row">
    <pre class="formatting accent">
                                 ....              
                  .',:clooo:  .:looooo:.           
               .;looooooooc  .oooooooooo'          
            .;looooool:,''.  :ooooooooooc          
           ;looool;.         'oooooooooo,          
          ;clool'             .cooooooc.  ,,       
             ...                ......  .:oo,      
      .;clol:,.                        .loooo'     
     :ooooooooo,                        'ooool     
    'ooooooooooo.                        loooo.    
    'ooooooooool                         coooo.    
     ,loooooooc.                        .loooo.    
       .,;;;'.                          ;ooooc     
           ...                         ,ooool.     
        .cooooc.              ..',,'.  .cooo.      
          ;ooooo:.           ;oooooooc.  :l.       
           .coooooc,..      coooooooooo.           
             .:ooooooolc:. .ooooooooooo'           
               .':loooooo;  ,oooooooooc            
                   ..';::c'  .;loooo:'         
            </pre
    >
    <div class="data">
      <span>
        <span class="accent">bradley</span>@<span class="accent">barbier</span>
      </span>
      <span>
        <span>---------------</span>
      </span>
      <span v-for="info in infos" :key="info.property">
        <span class="accent"> {{ info.property }}: </span>
        <span class="value" v-html="info.value" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 10px;

  .data {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #ccc;
    text-wrap: nowrap;
  }
}
</style>
