<template>
  <dialog role="dialog" aria-labelledby="dialog-title">
    <button @click="closeDialog" aria-label="Close Dialog" autofocus class="dialog__closebox">
      <span></span>
      <span></span>
    </button>
    <h2 id="dialog-title">{{ inputData.title }}<span class="dialog__date">{{ inputData.date }}</span></h2>
    <div class="dialog-content__wrapper">

      <div class="dialog__verbiage">
        <p v-html="inputData.body"></p>
        <a v-if="inputUrl != ''" :href="inputUrl" target="_new">
          {{ inputData.url }}
        </a>
      </div>

      <div class="image__wrapper">
        <div class="dialog__image">
          <div v-if="inputData.type == 'video' && typeof inputImage === 'string'">
            
            <video :key="src" controls preload="auto" :poster="imagePath+inputData.posterframe" :style="{'width': imageWidth + 'px'}">
              <source :src="src" type="video/mp4">
            </video>
          </div>

          <div 
            v-if="inputData.type == 'video' && typeof inputImage === 'object'"
            v-for="(imgUrl, i) in inputImage" 
            :key="i">

            <video :key="src" controls preload="auto" :poster="imagePath+inputData.posterframe[i]" :style="{'width': imageWidth + 'px'}">
              <source :src="imagePath+inputImage[i]" type="video/mp4">
            </video>
          </div>

          <img 
            v-else-if="inputData.type != 'video' && typeof inputImage === 'string'" 
            :src="imagePath+inputData.image" 
            :alt="inputAlt" 
            :style="{'width': imageWidth + 'px'}" />

          <div v-else-if="inputData.type != 'video' && typeof inputImage === 'object'">
            <img v-for="(imgUrl, i) in inputImage" 
              :key="i"
              :src="imagePath+imgUrl"
              :alt="inputAlt[i]"
              :style="{'width': imageWidth + 'px'}" />
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['inputData'],
  data() {
    return {
      inputImage: '',
      inputAlt: '',
      inputUrl: '',
      inputPoster: '',
      src: '',
      imageWidth: '',
      imagePath: './images/'
    }
  },
  methods: {
    closeDialog() {
      let d = document;
      d.querySelector("dialog").close();
      if (d.querySelector("video")) {
        d.querySelector("video").pause();
      }
      this.imageWidth = '';
    }
  },
  watch: {
    inputData: function(data) {
      this.inputImage = data.image;
      this.inputAlt = data.alt;
      this.inputUrl = data.url;
      this.imageWidth = data.width != '' ? this.imageWidth = data.width : '';
      this.inputPoster = data.posterframe;
      this.src = this.imagePath+this.inputImage;
    }
  }
}
</script>

<style>
  dialog {
    width: calc(100% - 100px);
    height: calc(100% - 100px);
    border: none;
    margin: 40px auto;
    border-radius: 5px;
    max-width: 990px;
    background-color: #efefef;
    overflow: hidden;

    h2, p, a {
      margin-bottom: 8px;
      line-height: 1.25;
    }
    h2 {
      padding-bottom: 8px;
      border-bottom: 1px solid #ccc;
      text-indent: 45px;
      text-align: left;
    }
    a {
      display: inline;
      font-size: .75rem;
      color: #1D1D1D;
      text-decoration: none;
    }
    video {
      width: 90%;
    }
    img {
      max-width: 100%;
    }
  }
  .dialog__closebox {
    width: 60px;
    height: 60px;
    display: inline-block;
    position: absolute;
    left: -10px;
    top: -10px;
    margin: 10px 2vw 0 8px;
    padding: 12px 10px;
    vertical-align: text-bottom;
    background-color: #efefef;
    margin-top: 8px;
    border-radius: 12px;
    border: 0;
    cursor: pointer;
    z-index: 6000;
    outline: 0;

    span:nth-child(1) {
      width: 50px;
      height: 6px;
      margin: 0;
      display: block;
      background-color: #1d1d1d;
      transition: all .2s linear;
      border-radius: 4px;
      rotate: 45deg;
      position: absolute;
      top: 27px;
      right: 5px;
    }
    span:nth-child(2) {
      width: 50px;
      height: 6px;
      border-radius: 4px;
      display: block;
      margin: 0;
      background-color: #1d1d1d;
      rotate: -45deg;
      position: absolute;
      top: 27px;
      right: 5px;
    }
  }
  .dialog-content__wrapper {
    display: flex;
    flex-direction: row;
    height: calc(100% - 40px);
  }
  .dialog__verbiage {
    width: 30%;
    padding: 8px;
    min-width: 250px;
  }
  .image__wrapper {
    height: auto;
    overflow: scroll;
    margin: 8px auto;
  }
  .dialog__image {
    text-align: center;
    padding: 0 20px;
  }
  .dialog__date {
    padding-left: .5rem;
    font-size: .75rem;
  }
  ::backdrop {
    background-color: rgba(0,0,0,.575);
  }
@media (max-width: 767px) {
  dialog {
    width: calc(100% - 16px);;
    height: calc(100% - 16px);
    margin:  auto;
    padding: 8px;

    &:modal {
      max-width: 100%
    }
    h2 {
      text-align: center;
      margin-top: 10px;
      padding-bottom: 10px;
    }
    video {
      width: 90%!important;
    }
    img {
      max-width: 100%;
    }
  }
  .dialog__closebox {
    width: 55px;
    height: 55px;
    left: 3px;
    margin: 10px 2vw 0 8px;
    

    span:nth-child(1) {
      width: 40px;
      height: 5px;
      top: 25px;
      right: 7px;
    }
    span:nth-child(2) {
      width: 40px;
      height: 5px;
      top: 25px;
      right: 7px;
    }
  }
  .dialog-content__wrapper {
    flex-direction: column;
  }
  .dialog__verbiage {
    width: 100%;
  }
  .dialog__image {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
  }
}
</style>
