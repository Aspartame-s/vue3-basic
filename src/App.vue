<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <h1>X: {{ x }}, Y: {{ y }}</h1>
    <h1 v-if="Loading">Loading!</h1>
    <modal :isOpen="isModalOpen" @close-modal="closeModal"> </modal>
    <button @click="openModal">open</button>
    <img v-if="Loaded" :src="result[0].url" alt="" />
    <button @click="add">👍+1</button>
  </div>
</template>

<script lang="ts">
import Modal from './components/Modal.vue'
import {
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
interface typeData {
  count: number;
  add: () => void;
  double: number;
}
interface dogResult {
  message: string;
  status: string;
}
interface catResult {
  url: string;
  width: string;
  height: string;
}
export default {
  components: {
    Modal
  },
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
        return data.count++;
      },
      double: computed(() => {
        return data.count * 2;
      }),
    });
    const { x, y } = useMousePosition();
    const {result, Loading, Loaded } = useURLLoader<catResult[]>('https://api.thecatapi.com/v1/images/search')
    // const { result, Loading, Loaded } = useURLLoader<dogResult>(
    //   "https://dog.ceo/api/breeds/image/random"
    // );
    const isModalOpen = ref(false)
    const closeModal = () => {
      isModalOpen.value = false
    }
    const openModal = () => {
      isModalOpen.value = true
    }
    watch(result, () => {
      if (result.value) {
        console.log(result.value[0]);
      }
    });
    const refData = toRefs(data);
    return {
      ...refData,
      x,
      y,
      result,
      Loading,
      Loaded,
      isModalOpen,
      closeModal,
      openModal
    };
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
