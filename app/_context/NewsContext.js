"use client";
import { createContext, useContext } from "react";
import { useNewsState } from "@/app/_hooks/useNewsState";
import { useNotification } from "@/app/_hooks/useNotification";

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const newsState = useNewsState();
  const { showSuccess, showError } = useNotification();

  const handleCreateNews = async (newsData) => {
    try {
      await newsState.actions.createNews(newsData);
      showSuccess("News created successfully");
    } catch (error) {
      showError(error.message || "Failed to create news");
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      const success = await newsState.actions.deleteNews(id);
      if (success) {
        showSuccess("News deleted successfully");
      }
    } catch (error) {
      showError(error.message || "Failed to delete news");
    }
  };

  const handleUpdateNews = async (id, newsData) => {
    try {
      const success = await newsState.actions.updateNews(id, newsData);
      if (success) {
        showSuccess("News updated successfully");
        return true;
      }
      return false;
    } catch (error) {
      showError(error.message || "Failed to update news");
      return false;
    }
  };

  const value = {
    ...newsState,
    actions: {
      ...newsState.actions,
      createNews: handleCreateNews,
      deleteNews: handleDeleteNews,
      updateNews: handleUpdateNews,
    },
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
}
