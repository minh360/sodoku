import { createI18n } from 'vue-i18n'
import i18nMessage from './i18n'


export default createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: i18nMessage,
    legacy: false
})