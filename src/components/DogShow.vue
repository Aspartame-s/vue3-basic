<template>
      <img :src="result && result.message" alt="">
</template>

<script lang='ts'>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
//   async setup() {
//     const dogData = await axios.get("https://dog.ceo/api/breeds/image/random");
//     return {
//       result: dogData.data
//     };
//   },
setup() {
    return new Promise((resolve) => {
       axios.get('https://dog.ceo/api/breeds/image/random').then(res => {
           return resolve({
               result: res.data
           })
       })
    })
}
});
</script>

<style scoped>
</style>