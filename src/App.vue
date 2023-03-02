<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="add">👍+1</button>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';

// export default defineComponent({
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// });
import { ref, computed, reactive, toRefs } from "vue";
interface typeData {
  count: number
  add: () => void
  double: number
}
export default {
  setup() {
    // const count = ref(0);
    // const add = () => {
    //   return count.value++
    // }
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // return {
    //   count,
    //   add,
    //   double
    // };
    const data: typeData = reactive({
        count: 0,
        add: () => {
          return data.count++
        },
        double: computed(() => {
          return data.count * 2
        })
    })
    const refData = toRefs(data)
    return {
      ...refData
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
