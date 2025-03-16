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
    <div style="max-width:1280px;margin:0 auto;position:relative;">
      
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

  <Dialog :inputData="this.inputData" />

  <div id="stage">
    <div id="area0" class="currentOne">
      <h2 class="area__name">Palace of Wonders</h2>
      <div class="area__wisdom">"The Situation Is In Charge"</div>
      <img class="home__image" src="@/assets/Hero_640x350_sig_dream.jpg" style="width:90%" alt="Dream of the mollusk" />
    </div>

    <div v-for="(item, i) in data_store" 
      :key="i" 
      :id="'area'+(i+1)">
      <h2 class="area__name">{{ data_store[i].section }}</h2>
      <div class="area__wisdom">{{ data_store[i].section_wisdom }}</div>
      
      <!-- Content Buckets -->
      <Bucket 
        v-for="(project) in data_store[i].projects" 
        :key="i" 
        :projectData="project" 
        @dialogData="this.setData($event)"
        />
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
/*  body {
    overflow: hidden;
  }*/
.headline {
  width: 100%;
  background-image: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%);
  position: relative;
  z-index: 50;
  display: block;
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
#stage .currentOne span {
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
#stage .area__wisdom {
  text-align: right;
  transform: rotate(-90deg);
  position: absolute;
  font-size: 1.25rem;
  width: 400px;
  color: #fff;
  left: -185px;
  top: 350px;
}
#area1 {
  position: absolute;
/*  transform: rotate(45deg);*/
  background-color: rgba(0, 0, 255, .15);
  width: 10px;
  height: 10px;
  top: -1420px;
  left: -600px;
  transition: all .3s ease-in;
  display: none;
}
#area2 {
  position: absolute;
  left: -50px;
  top: -1420px;
  width: 10px;
  height: 10px;
/*  transform: rotate(135deg);*/
  background-color: rgba(255, 0, 0, .15);
  transition: all .3s ease-in;
  display: none;
}
#area3 {
  position: absolute;
  right: -90px;
  top: -1420px;
  width: 10px;
  height: 10px;
/*  transform: rotate(180deg);*/
  background-color: rgba(148, 0, 211, .15);
  transition: all .3s ease-in;
  display: none;
}
#area4 {
  position: absolute;
  top: -1420px;
  right: -140px;
  width: 10px;
  height: 10px;
/*  transform: rotate(1135deg);*/
  background-color: rgba(12, 73, 0, .15);
  transition: all .3s ease-in;
  display: none;
}
#area5 {
  position: absolute;
  left: -880px;
  top: -1140px;
  width: 50px;
  height: 50px;
/*  transform: rotate(-45deg);*/
  background-color: rgba(255, 0, 255, .15);
  transition: all .3s ease-in;
  display: none;
}
#area0.currentOne,
#area1.currentOne,
#area2.currentOne,
#area3.currentOne,
#area4.currentOne,
#area5.currentOne {
  left: 0;
  top: 0;
  width: 100vw;
  height: inherit;
  padding-top: 90px;
  transform: rotate(0deg);
  transition: all .2s ease-in;
  display: block;
}
@media (max-width: 420px) {
  #area0.currentOne,
  #area1.currentOne,
  #area2.currentOne,
  #area3.currentOne,
  #area4.currentOne,
  #area5.currentOne  {
    top: 20px;
  }
}
#area0 {
  position: relative;
  text-align: center;
  padding-top: 90px;
  display: none;
  background-color: rgba(0, 0, 0, .15);
}
#area0.currentOne {
  padding-top: 90px;
  z-index: 45;
  display: block;
}
</style>
