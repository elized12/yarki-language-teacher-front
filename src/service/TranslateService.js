import api from "../http";

export default class TranslateService {
    static async addTranslate(word, translation, langWord, langTranslation) {
        return api.post('/translate', {
            firstWord: word,
            secondWord: translation,
            firstCode: langWord,
            secondCode: langTranslation
        });
    }

    static async removeTranslate(firstWordId, secondWordId) {
        return api.delete(`/translate/${firstWordId}/${secondWordId}`);
    }

    static async getTranslates(wordId) {
        return api.get(`/translate/${wordId}`);
    }
};
