<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <h1>X: {{ x }}, Y: {{ y }}</h1>
    <h1 v-if="Loading">Loading!</h1>
    <Suspense>
      <template #default>
        <async-show></async-show>
      </template>
      <template #fallback> Loading </template>
    </Suspense>
    <modal :isOpen="isModalOpen" @close-modal="closeModal"> </modal>
    <button @click="openModal">open</button>
    <img v-if="Loaded" :src="result[0].url" alt="" />
    <button @click="add">👍+1</button>
  </div>
</template>

<script lang="ts">
import Modal from "./components/Modal.vue";
import {
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
//ref 和 reactive 都是生成响应式对象的方法
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import AsyncShow from "./components/AsyncShow.vue";
interface typeData {
  count: number;
  add: () => void;
  double: number;
   numbers: number[];
  person: {
    name?: string
  };
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
    Modal,
    AsyncShow,
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
      numbers: [0, 1, 2],
      person: {},
    });
    const greetings = ref("");
    const editTitle = () => {
      greetings.value += "Hello!";
    };
    const { x, y } = useMousePosition();
    const { result, Loading, Loaded } = useURLLoader<catResult[]>(
      "https://api.thecatapi.com/v1/images/search"
    );
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log(newValue);
      console.log(oldValue);
      document.title = greetings.value + data.count;
    }); //wacth 第一个参数就是监听的值，可以是多个参数 写成数组形式
    // 第二个参数是一个回调函数，当监听的值发生变化时，可以进行逻辑操作
    // 该回调函数接受两个参数一个是 newValue 另一个是 oldValue
    //如果要监听对象中的某一个值要写成函数形式 () => data.count
    data.numbers[0] = 10; // 在vue2中 对响应式的数组无法做到修改某一项的值，但vue3可以轻松做到
    data.person.name = "cjh"; //在vue2中如果要修改对象的某个属性需要用到 $set 方法，但vue3中可以直接修改或添加
    const isModalOpen = ref(false);
    const closeModal = () => {
      isModalOpen.value = false;
    };
    const openModal = () => {
      isModalOpen.value = true;
    };
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
      openModal,
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
