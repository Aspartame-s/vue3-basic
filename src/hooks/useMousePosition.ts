import { ref, onMounted, onUnmounted, Ref, reactive, toRefs } from 'vue'
interface funData {
    x: Ref<number>; //如果直接定义成number会报错 Ref<number>类型无法复制给number类型
    y: Ref<number>;
}
//ref写法
// function useMousePosition(): funData {
//     const x = ref(0)
//     const y = ref(0)
//     const getMousePosition = (e: MouseEvent) => {
//       x.value = e.pageX
//       y.value = e.pageY
//     }
//     onMounted(() => {
//       document.addEventListener('click', getMousePosition)
//     })
//     onUnmounted(() => {
//       document.removeEventListener('click', getMousePosition)
//     })
//     return {x, y}
// }

//用reactive改写
function useMousePosition(): funData {
    const positionData = reactive({
        x: 0,
        y: 0,
        getMousePosition: (e: MouseEvent) => {
            positionData.x = e.pageX
            positionData.y = e.pageY
        }
    })
    const {getMousePosition} = positionData
    onMounted(() => {
        document.addEventListener('click', getMousePosition)
    })
    onUnmounted(() => {
        document.removeEventListener('click', getMousePosition)
    })
    const refData = toRefs(positionData)
    const {x, y} = refData
    return {
        x,
        y
    }
}

export default useMousePosition