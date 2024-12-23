
<template>
    <button class="area__bucket">
      <div class="area__content">{{ this.projectData.title }}</div>
      <span>
        <img class="area__icon" :src="getAssetUrl()" />
        {{ this.projectData.body }}
      </span>

    </button>
</template>


<script>
export default {
  name: 'Bucket',
  props: ['projectData'],
  methods: {
    getAssetUrl: function() {
     return 'src/assets/icons/' + this.projectData.icon;
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
}

.area__icon {
  width: 50px;
  height: 50px;
  display: inline;
  margin: 4px 10px 6px 0px;
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
  left: 0;
  top: 0;
  padding: 6px;
  background-color: #fff;
  color: #1d1d1d;
}
@media (max-width: 420px) {
  .area__bucket {
    width: 85%;
  }
}
</style>
