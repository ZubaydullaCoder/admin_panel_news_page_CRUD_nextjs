import { newsAPI } from "./api/news.api";
import { newsValidation } from "./validation/news.validation";

export const newsService = {
  async getAllNews() {
    try {
      const response = await newsAPI.getAll();
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  },

  async getNewsById(id) {
    try {
      const response = await newsAPI.getById(id);
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  },

  async createNews(newsData) {
    try {
      // Validate data first
      const validation = newsValidation.validateNewsItem(newsData);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      const response = await newsAPI.create(newsData);
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  },

  async deleteNews(id) {
    try {
      await newsAPI.delete(id);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to delete news",
      };
    }
  },

  async updateNews(id, newsData) {
    try {
      const validation = newsValidation.validateNewsItem(newsData);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      const response = await newsAPI.update(id, newsData);
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  },
};
