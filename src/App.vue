<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavWidget from './components/NavWidget.vue';
import Bucket from './components/Bucket.vue';
import Dialog from './components/Dialog.vue';
import data_store from './assets/data_store.js';

</script>

<template>
  <header>
    <div class="headline">
    <div class="headline__body">

      <NavWidget :dataStore="data_store" />

      <h1 class="headline__name">{{ header }}</h1>

      <div class="headline__links">
        <a href="https://www.github.com/tapecard" target="_new">
          github.com/tapecard
        </a>
        <a href="mailto:mike.cohen@tapecard.com">
          mike.cohen@tapecard.com
        </a>
      </div>
    </div>
    </div>
  </header>

  <Dialog :inputData="inputData" />

  <div id="stage">

    <div v-for="(item, i) in data_store" 
      :key="i" 
      :id="'area'+(i)" :class="i == 0 ? 'area--open' : ''">

      <div v-if="i==0">
        <h2 class="area__name">{{ data_store[i].section_subtitle }}</h2>
        <div class="area__wisdom">{{ data_store[i].section_wisdom }}</div>
        <img class="home__image" src="@/assets/Hero_dream.jpg" :alt="data_store[i].projects[0].alt" />
      </div>

      <div v-else-if="i>0">
        <h2 class="area__name">{{ data_store[i].section }}</h2>
        <div class="area__wisdom">{{ data_store[i].section_wisdom }}</div>
        <Bucket 
          v-for="(project) in data_store[i].projects" 
          :key="i" 
          :projectData="project" 
          @dialogData="setData($event)"
          />
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'App',
  components: {
    NavWidget,
    Dialog,
    Bucket
  },
  data() { 
    return {
      data_store,
      header: 'Michael P. Cohen',
      inputData: {}
    }
  },
  methods: {
    setData(data) {
      this.inputData = data;
    }
  }
}
</script>


<style scoped>
.headline {
  width: 100%;
  background-image: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%);
  position: relative;
  z-index: 50;
  display: block;
}
.headline__body {
  max-width:1280px;
  margin:0 auto;
  position:relative;
}
.headline__name {
  display: inline;
  font-size: 2rem;
  width: 45%;
  line-height: .5;
  margin-right: 2vw;
  font-family: sans-serif;
  vertical-align: 6px;
  font-weight: bold;
}
.headline__links {
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: 0;
  right: 0;
}
@media (max-width: 420px) {
  .headline__links {
    justify-content: space-around;
    width: 100%;
  }
  .headline__name {
    font-size: 1.75rem;
  }
  .nav__widget {
    margin-top: 24px;
  }
}
.headline__links a {
  display: inline;
  font-size: .75rem;
  line-height: 1;
  padding: 13px 16px;
  color: #1D1D1D;
  text-decoration: none;
}
.home__image {
  margin-top: 24px;
  max-width: 400px;
  width: 80%;
}
#stage {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: block;
   text-align: center;
}
#stage div {
  vertical-align: middle;
  color: #fff;
  font-family: sans-serif;
}
#stage .area--open span {
  font-size: 14px;
  line-height: 1;
  top: 130px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: -1;
  display: block;
}
.area__name {
  font-size: 2rem;
  text-align: center;
  padding: 0 16px;
  font-weight: bold;
  max-width: 1280px;
  margin: 0 auto;
}
.area__wisdom {
  text-align: right;
  transform: rotate(-90deg);
  position: fixed;
  font-size: 1.25rem;
  width: 600px;
  color: #fff;
  left: -284px;
  top: 400px;
}
#area1 {
/*  transform: rotate(45deg);*/
/*  background-color: rgba(0, 0, 255, .15);*/
  width: 10px;
  height: 10px;
  top: -1420px;
  left: -600px;
  transition: all .3s ease-in;
  display: none;
}
#area2 {
  left: -50px;
  top: -1420px;
  width: 10px;
  height: 10px;
/*  transform: rotate(135deg);*/
  transition: all .3s ease-in;
  display: none;
}
#area3 {
  right: -90px;
  top: -1420px;
  width: 10px;
  height: 10px;
/*  transform: rotate(180deg);*/
  transition: all .3s ease-in;
  display: none;
}
#area4 {
  top: -1420px;
  right: -140px;
  width: 10px;
  height: 10px;
/*  transform: rotate(1135deg);*/
  transition: all .3s ease-in;
  display: none;
}
#area5 {
  left: -880px;
  top: -1140px;
  width: 50px;
  height: 50px;
/*  transform: rotate(-45deg);*/
  transition: all .3s ease-in;
  display: none;
}
#area0.area--open,
#area1.area--open,
#area2.area--open,
#area3.area--open,
#area4.area--open,
#area5.area--open {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  padding-top: 90px;
  transform: rotate(0deg);
  transition: all .2s ease-in;
  display: block;
  z-index: 45;
}
@media (max-width: 420px) {
  #area0.area--open,
  #area1.area--open,
  #area2.area--open,
  #area3.area--open,
  #area4.area--open,
  #area5.area--open  {
    top: 20px;
  }
  .area__name {
    font-size: 1.5rem;
  }
}
#area0 {
  position: relative;
  text-align: center;
  padding-top: 90px;
  display: none;
}
</style>
