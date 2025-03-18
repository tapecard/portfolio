<template>
  <dialog>
    <button @click="closeDialog" autofocus class="dialog__closebox">
      <span></span>
      <span></span>
    </button>
    <h2>{{ inputData.title }}<span class="dialog__date">{{ inputData.date }}</span></h2>
    <div class="dialog-content__wrapper">

      <div class="dialog__verbiage">
        <p v-html="inputData.body"></p>
        <a v-if="this.inputUrl != ''" :href="this.inputUrl">
          {{ inputData.url }}
        </a>
      </div>

      <div class="dialog__image">
        <div v-if="inputData.type == 'video' && typeof this.inputImage === 'string'">
          
          <video :key="src" controls preload="auto" :poster="this.imagePath+inputData.posterframe" :style="{'width': imageWidth + 'px'}">
          <source :src="src" type="video/mp4">
          </video>
        </div>

        <div 
          v-if="inputData.type == 'video' && typeof this.inputImage === 'object'"
          v-for="(imgUrl, i) in this.inputImage" 
          :key="i">

          <video :key="src" controls preload="auto" :poster="this.imagePath+inputData.posterframe[i]" :style="{'width': imageWidth + 'px'}">
            <source :src="this.imagePath+this.inputImage[i]" type="video/mp4">
          </video>
        </div>



        <img 
          v-else-if="inputData.type != 'video' && typeof this.inputImage === 'string'" 
          :src="this.imagePath+inputData.image" 
          :alt="this.inputAlt" 
          :style="{'width': imageWidth + 'px'}" />

        <div v-else-if="inputData.type != 'video' && typeof this.inputImage === 'object'">
          <img v-for="(imgUrl, i) in this.inputImage" 
            :key="i"
            :src="this.imagePath+imgUrl"
            :alt="this.inputAlt[i]"
            :style="{'width': imageWidth + 'px'}" />
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
      imagePath: './src/assets/images/',
      d: document
    }
  },
  methods: {
    closeDialog() {
      this.d.querySelector("dialog").close();
      this.d.querySelector("video").pause();
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

    h2, p, a {
      margin-bottom: 8px;
      line-height: 1.25;
    }
    h2 {
      padding-bottom: 8px;
      border-bottom: 1px solid #ccc;
      text-indent: 8px;
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
    position: fixed;
    left: 3px;
    top: 3px;
    margin: 10px 2vw 0 8px;
    padding: 12px 10px;
    vertical-align: text-bottom;
    background-color: #fff;
    margin-top: 8px;
    border-radius: 12px;
    border: 0;
    cursor: pointer;

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
  }
  .dialog__verbiage {
    width: 30%;
    padding: 8px;
  }
  .dialog__image {
    text-align: center;
    margin: 8px auto;
    width: 70%;
    padding: 0 20px;
  }
  .dialog__date {
    padding-left: .5rem;
    font-size: .75rem;
  }
  ::backdrop {
    background-color: rgba(0,0,0,.5);
  }
@media (max-width: 767px) {
  dialog {
    width: 100%;
    height: calc(100% - 8px);
    margin: 40px auto;
    padding: 8px;

    &:modal {
      max-width: 100%
    }
    h2 {
      text-align: center;
    }

    img {
      max-width: 100%;
    }
  }
  .dialog__closebox {
    width: 55px;
    height: 55px;
    
    left: 3px;
    top: -3px;
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
