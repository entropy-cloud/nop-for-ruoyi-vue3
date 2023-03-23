import type { App } from 'vue';

//import AmisPage from './amis/AmisPage.vue'

// Amis内置的调试器需要这里的css
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
// import 'amis/lib/helper.css';
//import 'amis/sdk/iconfont.css';
import 'amis-ui/lib/locale/en-US';
import 'amis-ui/lib/locale/zh-CN';

// 为amis的helper.css增加命名空间，避免和jeecg的css冲突
import './css/helper.less'

import './amis/AmisVueComponent'

import { clearLocalCache } from './api';
import useUserStore  from '../store/modules/user';
import AmisPage from './amis/AmisPage.vue'

import IconSelect from '@/components/IconSelect'
import { registerVueComponentResolver } from './core';
import './registerLibs'

import './fix.css'

export function initNopApp(app:App){
   app.component("amis-page", AmisPage)
   app.component("icon-picker",IconSelect)
   //app.component("icon",Icon)

   registerVueComponentResolver(app.component)

   useUserStore().$subscribe((mutation)=>{
      // 登录信息变化的时候清空页面缓存和字典缓存
      if(mutation.events && mutation.events){
         if(Array.isArray(mutation.events)){
            for(const event of mutation.events){
               if(event.key == 'userInfo'){
                  clearLocalCache()
               }
            }
         }else if(mutation.events.key == 'userInfo'){
            clearLocalCache()
         }
      }
   })
}