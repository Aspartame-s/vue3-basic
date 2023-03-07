<template>
  <teleport to="#modal">
    <div id="center">
      <h2>this is a modal</h2>
    </div>
  </teleport>
</template>

<script lang='ts'>
export default {};
</script>

<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>