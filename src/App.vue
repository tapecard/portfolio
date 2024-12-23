<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Bucket from './components/Bucket.vue'
</script>

<template>
  <header>
    <div class="headline">

      <button class="nav__widget" :class="{ 'nav__widget--open': navOpen }" @click="toggleDrawer">
        <div></div>
        <div></div>
        <div></div>
      </button>

      <div class="nav__drawer" id="navDrawer" :class="{ 'nav__drawer--open': navOpen }">
        <div class="nav__drawer-slip">
          <button class="nav__buttons" disabled="disabled" @click="selectArea(0)">
            <div class="button__main">Home</div>
          </button>
          <button class="nav__buttons" 
            v-for="(blob, i) in data_store" 
            v-bind:key="i" 
            @click="selectArea(i+1)">
            <div class="button__main">{{data_store[i].section}}</div>
            <div class="button__sub">{{data_store[i].menu_subtitle}}</div>
          </button>
        </div>
        <div class="nav__hit"></div>
      </div>

      <h1 class="headline__name">{{ header }}</h1>

      <div class="headline__links">
        <a href="https://www.github.com/tapecard">
          github.com/tapecard
        </a>
        <a href="mailto:mike.cohen@tapecard.com">
          mike.cohen@tapecard.com
        </a>
      </div>

    </div>
  </header>

  <div id="stage">
    
    <div id="area0" class="currentOne">
      <img class="home__image" src="@/assets/houseullr.png" alt="House Ullr logo" />
    </div>
    <div v-for="(blob, i) in data_store" 
      v-bind:key="i"  
      :id="'area'+(i+1)">

      <h2 class="area__name">{{ data_store[i].section }}</h2>
      
      <div class="area__motto">{{ data_store[i].section_motto }}</div>
      
      <Bucket 
        v-for="(project, i) in data_store[i].projects" 
        v-bind:key="i"
        :projectData="project" />
    </div>

  </div>
  
</template>


<script>
import data_store from './assets/data_store.js';
export default {
  name: 'App',
  components: {
  },
  data() { 
    return {
      data_store,
      navOpen: '',
      d: document,
      header: 'Michael P. Cohen',
      displayClass: ''
    }
  },
  methods: {
    toggleDrawer() {
      this.navOpen = !this.navOpen;

      if (this.navOpen == true) {
        this.d.addEventListener('click', handler);
        function handler() {
          // if (event.target.id != "navDrawer") {
          //    this.navOpen = false
          // }
           //console.log(event.target.id)
          //}
        }
      }
    },
    selectArea(index) {
      let areaId = "area" + index;
      let navtree = this.d.getElementsByClassName('nav__buttons');
      let elems = this.d.getElementsByClassName('currentOne');
      let el = this.d.getElementById(areaId);
      elems[0].classList.remove('currentOne');
      el.classList.add('currentOne');

      for (let i=0; i<navtree.length; i++) {
        navtree[i].removeAttribute('disabled');
      }
      navtree[index].setAttribute('disabled', 'disabled');
      
      this.navOpen = false;
    }
  }
}
</script>


<style scoped>
.headline {
  width: 100%;
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%);
  position: relative;
  z-index: 50;
  display: block;
}
.nav__widget {
  width: 66px;
  height: 66px;
  display: inline-block;
  position: relative;
  margin: 10px 2vw 0 8px;
  padding: 12px 10px;
  vertical-align: text-bottom;
  background-color: #fff;
  margin-top: 8px;
  border-radius: 12px;
  border: 0;
  cursor: pointer;
}
.nav__widget div:nth-child(1) {
  margin-top: 2px;
}
.nav__widget div {
  width: 100%;
  height: 8px;
  margin: 9px 0;
  display: block;
  background-color: #000;
}

.nav__widget div:nth-child(1) {
  margin-top: 2px;
}
.nav__widget div {
  width: 100%;
  height: 8px;
  margin: 9px 0;
  display: block;
  background-color: #000;
}

.nav__drawer {
  position: absolute;
  opacity: 0;
  margin-left: 8px;
  width: 0;
  border-radius: 12px;
  background: linear-gradient(20deg, rgba(255,255,255,.75) 0%, rgba(255,255,255,.5) 100%); 
  box-shadow: 0 0 20px 20px #fff inset;
  backdrop-filter: blur(6px);
  transition: all .15s ease;
  z-index: 2;
/*  overflow: hidden;*/
}
/**/
.nav__drawer--open {
  opacity: 1;
  width: 240px;
  transition: all .15s ease;
}
.nav__drawer-slip {
  width: 240px;
}
.nav__drawer button {
  display: block;
  background-color: transparent;
  cursor: pointer;
  margin: 4px;
  padding: 4px 12px;
  text-align: left;
  border-color: transparent;
  border-bottom-right-radius: 8px;
  width: 100%;
}
.nav__drawer button:disabled {
  cursor: default;
  color: #999;
}
/*.nav__hit {
  width: 100vw;
  height: 100vh;
  background: rgba(50, 0, 50,.2);
  display: block;
  position: absolute;
  top: -90px;
  z-index: -1;
}*/
.button__main {
  font-weight: bold;
}
.button__sub {
  font-size: .75rem;
}

.headline__name {
  display: inline;
  font-size: 2rem;
  width: 45%;
  line-height: 1;
  margin-right: 2vw;
  font-family: sans-serif;
  vertical-align: 6px;
  font-weight: bold;
}
.headline__links {
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: 5px;
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
  margin: 0 16px;
  color: #1D1D1D;
  text-decoration: none;
}
.headline__description {
  width: 100%;
}
.home__image {
  margin-top: 24px;
}
#stage {
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: block;
  overflow: hidden;
   text-align: center;
}
#stage div {
  vertical-align: middle;
  color: #fff;
  font-family: sans-serif;
}
#stage div.currentOne span {
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
  text-align: left;
  padding: 0 16px;
  font-weight: bold;
}
#stage div.area__motto {
  text-align: right;
  transform: rotate(-90deg);
  position: absolute;
  font-size: 1.25rem;
  width: 400px;
  color: #fff;
  left: -185px;
  top: 325px;
}
#area1 {
  position: absolute;
  transform: rotate(290deg);
  background-color: rgba(0, 0, 255, .15);
  width: 10px;
  height: 10px;
  top:-420px;
  left:-200px;
  transition: all .3s ease-in;
}
#area2 {
  position: absolute;
  left: -50px;
  top: calc(100vh + 50px);
  width: 10px;
  height: 10px;
  transform: rotate(135deg);
  background-color: rgba(255, 0, 0, .15);
  transition: all .3s ease-in;
}
#area3 {
  position: absolute;
  right: -90px;
  top: -500px;
  width: 10px;
  height: 10px;
  transform: rotate(180deg);
  background-color: rgba(148, 0, 211, .15);
  transition: all .3s ease-in;
}
#area4 {
  position: absolute;
  top: calc(100vh + 50px);
  right: -140px;
  width: 10px;
  height: 10px;
/*  transform: rotate(1135deg);*/
  background-color: rgba(12, 73, 0, .15);
  transition: all .3s ease-in;
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
  height: 100vh;
  padding-top: 90px;
  transform: rotate(0deg);
  transition: all .2s ease-in;
}
#area0 {
/*  display: none;*/
  position: relative;
  text-align: center;
  padding-top: 120px;
  opacity: 0;
  background-color: rgba(0, 0, 0, .15);
  transition: opacity .25s ease-in;
}
#area0.currentOne {
  padding-top: 120px;
  /*  display: block;*/
  z-index: 45;
  opacity: 1;
  transition: opacity .5s ease-in;
}
</style>
