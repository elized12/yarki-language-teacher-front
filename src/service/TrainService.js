import api from "../http";

export default class TrainService {
    static async startSession(sourceLang, targetLang) {
        return api.post("/train/session", { source_language: sourceLang, target_language: targetLang });
    }

    static async getTask(sessionId) {
        return api.get(`/train/session/${sessionId}/task`);
    }

    static async submitAnswer(cardId, answer) {
        return api.post(`/train/session/${cardId}/answer`, { 'answer': answer });
    }

    static async finishSession(sessionId) {
        return api.post(`/train/session/finish`, { 'sessionId': sessionId });
    }
};