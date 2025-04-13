<script setup>
//import { RouterLink, RouterView } from 'vue-router';
import NavWidget from './components/NavWidget.vue';
import Bucket from './components/Bucket.vue';
import Dialog from './components/Dialog.vue';
import data_store from './assets/data_store.js';

</script>

<template>
  <header>
    <div class="headline">
    <div class="headline__body">

      <NavWidget :dataStore="data_store" :trigger="navState" />

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
      class="project__area"
      :class="i == 0 ? 'area--open' : ''">

      <div v-if="i==0">
        <button class="hero__target" @click="startModal0(data_store[i].projects[0])">
          <h2 class="area__name">{{ data_store[i].section_subtitle }}</h2>
          <div class="area__sideline">{{ data_store[i].section_sideline }}</div>
          <img class="home__image" src="@/assets/Hero_dream.jpg" :alt="data_store[i].projects[0].alt" />
        </button>
          <h3 class="area__description">{{ data_store[i].section_description }}</h3>
      </div>

      <div v-else-if="i>0">
        <h2 class="area__name">{{ data_store[i].section }}</h2>
        <div class="area__sideline">{{ data_store[i].section_sideline }}</div>
        <Bucket v-for="(project) in data_store[i].projects" 
          :key="i" 
          :projectData="project" 
          @dialogData="setData($event)"
          />
      </div>
    </div>

    <div class="footer__links">
      <button class="footer__buttons" 
          v-for="(item, f) in data_store" 
          :key="f" 
          @click="selectArea(f)">
        <span>{{ data_store[f].section }}</span>
      </button>
    </div>
    <div class="copyright">
     All work &copy;{{ thisYear }} Michael P. Cohen
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
      inputData: {},
      thisYear: new Date().getFullYear(),
      navState: false
    }
  },
  methods: {
    setState(arg) {
      this.navState = !this.navState;
    },
    setData(data) {
      this.inputData = data;
      this.setState();
    },
    startModal0: function(projectData) {
      this.setData(projectData);
      document.querySelector("dialog").showModal();
    },
    selectArea(index) {
      let d = document;
      let navtree = d.getElementsByClassName('nav__buttons');
      let openOne = d.getElementsByClassName('area--open');
      let visibleOne = d.getElementById("stage").children[index];

      d.body.style.background = this.data_store[index].section_background;
      
      openOne[0].classList.remove('area--open');
      visibleOne.classList.add('area--open');

      for (let element of navtree) {
        element.removeAttribute('disabled');
      }
      navtree[index].setAttribute('disabled', 'disabled');
      this.setState();
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
  max-width: 1280px;
  margin:0 auto;
  position: relative;
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
.footer__links {
  max-width: calc(100% - 60px);
  margin: 0 auto;
}
.footer__buttons,
.hero__target {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.footer__buttons {
  padding: 12px;
  color: #fff;
  font-size: 1rem;
}
.footer__buttons:hover {
  text-decoration: underline
}
.copyright {
  font-size: .75rem;
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
.area--open span {
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
  text-shadow: .5px .5px .5px #1d1d1d;
  margin: 0 auto;
}
.area__sideline {
  text-align: right;
  transform: rotate(-90deg);
  position: fixed;
  font-size: 1.25rem;
  width: 600px;
  left: -284px;
  top: 300px;
  opacity: .5;
}
.area__description {
  font-size: 1.25rem;
  max-width: 400px;
  margin: 10px auto;
  width: calc(100% - 44px);
  line-height: 1.1;
}
.hero__target {
  color: aliceblue;
}
.project__area {
  position: relative;
  text-align: center;
  display: none;
  transition: all .3s ease-in;
}
.project__area.area--open {
  top: initial;
  right: initial;
  left: initial;
  width: initial;
  height: initial;
  width: 100vw;
  margin-top: 90px;
  transform: rotate(0deg);
  transition: all .2s ease-in;
  display: block;
  z-index: 45;
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
  .project__area.area--open {
    margin-top: 110px;
  }
  .area__name {
    font-size: 1.5rem;
  }
  .area__sideline {
    font-size: 1rem;
  }
}
</style>
