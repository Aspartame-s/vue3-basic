<template>
  <!-- 通过 teleport 包裹 可以将该组件移到顶层位置 和 app 同级 to属性可以设置挂载到哪个节点上 -->
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="closeModal">Close</button>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    //能清楚的知道该组件要向外发送的事件
    "close-modal": null
  },
  setup(props, context) {
    const closeModal = () => {
      context.emit("close-modal");
    };
    return {
      closeModal
    };
  },
});
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