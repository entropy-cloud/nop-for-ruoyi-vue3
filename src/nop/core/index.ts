/**
 * 实现与外部框架的适配
 */

import router from '/@/router'
import store  from '/@/store'

export * from './auth'

export * from './ajax'
export * from './i18n'
export * from './cache'

export * from './debug'

export * from './resolve'

export function useGo(router:any){
    function go(path:string, replace?:boolean){
        if(replace){
            router.replace(path)
        }else{
            router.push(path)
        }
    }
    return go;
}

export {
    store, router
}