export default class LanguageService {
    static getLanguages() {
        return [
            { id: 1, code: 'ru', flag: '🇷🇺', name: 'Русский' },
            { id: 2, code: 'en', flag: '🇬🇧', name: 'Английский' },
        ];
    }
};