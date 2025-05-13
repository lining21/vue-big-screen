import { createI18n } from 'vue-i18n'

export const messages:any = {
    // zh_CN: {...zh_CN},
    // en: {...en}
}

// 自动导入模块
const files:any = import.meta.globEager('./language/**.ts');
const modules = {} as any
for (const key in files) {
    modules[key.replace(/(\.\/language\/|\.ts)/g, '')] = files[key].default
}
Object.keys(modules).forEach(item => {
  messages[item] = { ...modules[item] }
})

// 获取浏览器当前语言
const getCurrentLanguage = () => {
    const language = navigator.language
    const currentLanguage = language.indexOf('zh') !== -1 ? 'zh_CN' : 'en'
    localStorage.setItem('language', currentLanguage)
    return currentLanguage
}

// 创建i18n实例
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('language') || getCurrentLanguage() || 'zh_CN',
    messages: messages
})

export default i18n
