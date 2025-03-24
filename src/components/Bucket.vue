
<template>
    <button @click="startModal(projectData)" class="area__bucket">
      <h3 class="area__content">{{ projectData.title }}</h3>
      <span>
        <img class="area__icon" :src="getIconUrl()" />
        <p v-html="projectData.body"></p>
      </span>
    </button>
</template>


<script>
export default {
  name: 'Bucket',
  props: ['projectData'],
  methods: {
    getIconUrl: function() {
     return './icons/' + this.projectData.icon;
    },
    startModal: function(projectData) {
      document.querySelector("dialog").showModal();
      this.$emit('dialogData', this.projectData);
      this.$emit('navState', false);
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
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  vertical-align: top;
  text-align: left;
  box-shadow: .25px .25px .25px #555;
}
.area__bucket:after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  left: 0;
  background-image: linear-gradient(180deg, rgba(255,255,255,0) -15%, rgb(255, 255, 255) 88%);
}
.area__icon {
  width: 50px;
  height: 50px;
  margin: 5px 10px 6px 0px;
  float: left;
}
.area__bucket span {
  text-align: left;
  overflow: hidden;
  position: relative;
  display: inline-block;
  padding: 32px 8px 16px 8px;
  text-align: left;
  color: #555;
  font-size: .75rem;
}
.area__bucket div {
  display: inline-block;
  font-size: 12px;
  text-align: center;
  font-size: .875rem;
}
.area__content {
  position: absolute;
  width: 100%;
  height: 30px;
  left: 0;
  top: 0;
  padding: 6px;
  background-color: #fff;
  color: #1d1d1d;
  line-height: 1.3;
  overflow: hidden;
  
}
@media (max-width: 500px) {
  .area__bucket {
    width: 85%;
  }
}
</style>
