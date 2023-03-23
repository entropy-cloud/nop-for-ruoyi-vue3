import useUserStore  from '/@/store/modules/user'

import {getToken, setToken} from '/@/utils/auth'

import  auth from '/@/plugins/auth'

export function isUserInRole(role: string) {
  return auth.hasRole(role)
}

export function getCurrentUser() {
  const userInfo = useUserStore()
  return {
    userName: userInfo.name,
    realName: userInfo.realname,
    avatar:   userInfo.avatar,
    tenantId: userInfo.tenantid
  }
}

export function getTenantId(){
  return useUserStore().tenantId
}

export function setAuthToken(token:string){
  setToken(token)
}

export function getAuthToken(){
  return getToken()
}

export function clearAuthToken(){
  
}