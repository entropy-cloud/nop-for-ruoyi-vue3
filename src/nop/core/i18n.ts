import {ref} from 'vue'

const currentLocale = ref("zh-CN")

function useI18n(){
    return {
        t : (msg)=>msg
    }
}
export {
    currentLocale, useI18n
}