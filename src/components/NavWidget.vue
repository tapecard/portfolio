<template>
  <button 
        @click="toggleDrawer"
        class="nav__widget" 
        :class="{ 'nav__widget--open': navOpen }">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav__drawer" :class="{ 'nav__drawer--open': navOpen }">
    <div class="nav__drawer-slip">
      <button class="nav__buttons" disabled="disabled" @click="selectArea(0)">
        <div class="nav__buttons-main">Home</div>
      </button>
      <button class="nav__buttons" 
        v-for="(blob, i) in this.dataStore" 
        v-bind:key="i" 
        @click="selectArea(i+1)">
        <div class="nav__buttons-main">{{ this.dataStore[i].section }}</div>
        <div class="nav__buttons-sub">{{ this.dataStore[i].section_subtitle }}</div>
      </button>
    </div>
    <div class="nav__out" @click="toggleDrawer"></div>
  </div>
</template>


<script>
export default {
  name: 'NavWidget',
  props: ['dataStore'],
  components: {
  },
  data() { 
    return {
      navOpen: false,
      d: document,
    }
  },
  methods: {
    toggleDrawer() {
      this.navOpen = !this.navOpen;
      if (this.navOpen) {
        this.d.body.style.overflow = "hidden"
      } else {
        this.d.body.style.overflow = "initial";
      }
    },
    selectArea(index) {
      let navtree = this.d.getElementsByClassName('nav__buttons');
      let elems = this.d.getElementsByClassName('currentOne');
      let el = this.d.getElementById("area" + index);
      
      elems[0].classList.remove('currentOne');
      el.classList.add('currentOne');

      for (let i=0; i<navtree.length; i++) {
        navtree[i].removeAttribute('disabled');
      }
      navtree[index].setAttribute('disabled', 'disabled');

      this.navOpen = false;
      this.d.body.style.overflow = "initial";

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
  backdrop-filter: blur(6px);
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
    .nav__out {
      width: 100vw;
      height:  calc(100vh - 80px);;
      position: absolute;
      top: 0;
      z-index: -1;
      left: -8px;
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
  margin-left: -240px;
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
