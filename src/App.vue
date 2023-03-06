<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <h1>X: {{x}}, Y: {{y}}</h1>
    <h1 v-if="Loading">Loading!</h1>
    <h1 v-if="Loaded">Loaded</h1>
    <img :src="result.message" alt="">
    <button @click="add">👍+1</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, onMounted, onUnmounted } from "vue";
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
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
    const {x, y} = useMousePosition()
    const { result, Loading, Loaded, error} = useURLLoader('https://dog.ceo/api/breeds/image/random')
    const refData = toRefs(data)
    return {
      ...refData,
      x,
      y,
      result,
      Loading,
      Loaded,
      error
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
