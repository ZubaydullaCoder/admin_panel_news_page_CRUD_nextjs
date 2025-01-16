import axios from "axios";

const BASE_URL = "/api/news";
const DELAY = 500; // Simulate network delay

export const newsAPI = {
  // Get all news items
  async getAll() {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      const news = JSON.parse(localStorage.getItem("news_items") || "[]");
      return { data: news, status: 200 };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get single news item by ID
  async getById(id) {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      const news = JSON.parse(localStorage.getItem("news_items") || "[]");
      const item = news.find((item) => item.id === id);

      if (!item) throw new Error("News item not found");
      return { data: item, status: 200 };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Create new news item
  async create(data) {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      const news = JSON.parse(localStorage.getItem("news_items") || "[]");
      const newItem = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };

      news.push(newItem);
      localStorage.setItem("news_items", JSON.stringify(news));

      return { data: newItem, status: 201 };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async delete(id) {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      let news = JSON.parse(localStorage.getItem("news_items") || "[]");

      const index = news.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error("News item not found");
      }

      news = news.filter((item) => item.id !== id);
      localStorage.setItem("news_items", JSON.stringify(news));

      return { status: 200, message: "News deleted successfully" };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async update(id, data) {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      let news = JSON.parse(localStorage.getItem("news_items") || "[]");

      const index = news.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error("News item not found");
      }

      const updatedItem = {
        ...news[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      news[index] = updatedItem;
      localStorage.setItem("news_items", JSON.stringify(news));

      return { data: updatedItem, status: 200 };
    } catch (error) {
      throw this.handleError(error);
    }
  },
  // Error handler
  handleError(error) {
    return {
      message: error.message || "An error occurred",
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };
  },
};
