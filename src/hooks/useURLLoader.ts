import {ref, Ref} from 'vue'
import axios from 'axios'
// interface funType {
//     result: Ref<unknown>;
//     Loaded: Ref<boolean>;
//     Loading: Ref<boolean>;
//     error: Ref<unknown>;
// }
function useURLLoader<T>(url: string) {
    const result = ref<T | null>(null)
    const Loaded = ref(false)
    const Loading = ref(true)
    const error = ref(null)
    axios.get(url).then(res => {
        result.value = res.data
        Loaded.value = true
        Loading.value = false
    }).catch(e => {
        error.value = e
        Loading.value = false
    })
    return {
        result,
        Loaded,
        Loading,
        error
    }
}
export default useURLLoader