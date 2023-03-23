
const prefix = import.meta.env.VITE_APP_BASE_API || '';
export function useGlobalSetting(){
    return {
        apiUrl: prefix,
        editorUrl: prefix + '/amis-editor/index.html'
    }
}