<template>
  <button 
        @click="toggleDrawer"
        class="nav__widget" 
        :class="{ 'nav__widget--open': navState }">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav__drawer" :class="{ 'nav__drawer--open': navState }">
    <div class="nav__drawer-slip">
      <button class="nav__buttons" 
        v-for="(item, i) in dataStore" 
        :key="i" 
        @click="selectArea(i)">
        <div class="nav__buttons-main">{{ dataStore[i].section }}</div>
        <div v-if="i != 0" class="nav__buttons-sub">{{ dataStore[i].section_subtitle }}</div>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'NavWidget',
  props: ['dataStore','trigger'],
  components: {
  },
  data() { 
    return {
      navState: false,
      d: document
    }
  },
  watch: {
    trigger() {
      this.navState = false;
    }
  },
  methods: {
    toggleDrawer() {
      this.navState = !this.navState;
    },
    selectArea(index) {
      let navtree = this.d.getElementsByClassName('nav__buttons');
      let elems = this.d.getElementsByClassName('area--open');
      let el = this.d.getElementById("stage").children[index];
      
      this.d.body.style.backgroundColor = this.dataStore[index].section_color;
      
      elems[0].classList.remove('area--open');
      el.classList.add('area--open');

      for (let element of navtree) {
        element.removeAttribute('disabled');
      }
      navtree[index].setAttribute('disabled', 'disabled');
      this.navState = false;
    }
  }
}
</script>


<style>
.area__bucket {
  background-color: rgba(255,255,255,.5);
  position: relative;
  display: inline-block;
  width: 210px;
  height: 110px;
  border: 1px solid #fff;
  margin: 20px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  vertical-align: top;
  text-align: left;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    left: 0;
    background-image: linear-gradient(180deg, rgba(255,255,255,0) -15%, rgb(255, 255, 255) 88%);
  }
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

  span {
    width: 100%;
    height: 8px;
    margin: 9px 0;
    display: block;
    background-color: #000;
    transition: all .2s linear;
     
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  &.nav__widget--open span {
    border-radius: 8px;
    transition: all .2s linear;

    &:first-child {
      width: 29px;
      transform: rotate(-45deg) translate(8.5px, 18px);
      transition: all .2s linear;
    }
    &:nth-child(2) {
      width: 58px;
      transform: rotate(45deg) translate(-4.5px, 4.5px);
      transition: all .2s linear;
    }
    &:nth-child(3) {
      width: 29px;
      transform: rotate(-45deg) translate(3.5px, -6px);
      transition: all .2s linear;
    }
  }
}
.nav__drawer {
  position: absolute;
  opacity: 0;
  margin-left: 8px;
  width: 0;
  border-radius: 12px;
  background: linear-gradient(20deg, rgba(255,255,255,.75) 0%, rgba(255,255,255,.5) 100%); 
  box-shadow: 0 0 20px 20px #fff inset;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all .15s ease;
  z-index: 2;

  &.nav__drawer--open {
    opacity: 1;
    width: 240px;
    transition: all .15s ease;

    .nav__drawer-slip {
       display: block;
       margin-left: 0;
    }
  }

  button {
    display: block;
    background-color: transparent;
    cursor: pointer;
    margin: 4px;
    padding: 4px 12px;
    text-align: left;
    border-color: transparent;
    border-bottom-right-radius: 8px;
    width: 100%;

    &:disabled {
      cursor: default;
      color: #999;
    }
  }
}
.nav__drawer-slip {
  width: 240px;
  margin-left: -2400px;
}
.nav__buttons-main {
  font-weight: bold;
}
.nav__buttons-sub {
  font-size: .75rem;
}
@media (max-width: 420px) {
  .nav__widget {
    margin-top: 36px;
  }
}
</style>
