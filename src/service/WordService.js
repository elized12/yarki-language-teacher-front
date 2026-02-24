import api from "../http";

export default class WordService {
    static async getCount(languageCode) {
        const user = JSON.parse(localStorage.getItem("user"));

        return api.get(`/words/${user.id}/${languageCode}/count`);
    }

    static async getWords(languageCode, limit, offset) {
        const user = JSON.parse(localStorage.getItem("user"));

        return api.get(`/words/${user.id}/${languageCode}?offset=${offset}&limit=${limit}`);
    }
};