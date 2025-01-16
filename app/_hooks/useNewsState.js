"use client";
import { useState, useCallback } from "react";
import { newsService } from "@/app/_services/news.service";
import { toast } from "react-toastify";

export const useNewsState = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await newsService.getAllNews();
      if (response.success) {
        setNews(response.data);
      } else {
        setError(response.error);
        toast.error(response.error || "Failed to fetch news");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error loading news");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createNews = useCallback(async (newsData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await newsService.createNews(newsData);
      if (response.success) {
        setNews((prev) => [...prev, response.data]);
        toast.success("News created successfully");
        return true;
      } else {
        setError(response.error);
        toast.error(response.error || "Failed to create news");
        return false;
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error creating news");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteNews = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await newsService.deleteNews(id);
      if (response.success) {
        setNews((prev) => prev.filter((item) => item.id !== id));
        toast.success("News deleted successfully");
        return true;
      } else {
        setError(response.error);
        toast.error(response.error || "Failed to delete news");
        return false;
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error deleting news");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectNews = useCallback((newsItem) => {
    setSelectedNews(newsItem);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNews(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateNews = useCallback(async (id, newsData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await newsService.updateNews(id, newsData);
      if (response.success) {
        setNews((prev) =>
          prev.map((item) => (item.id === id ? response.data : item))
        );
        toast.success("News updated successfully");
        console.log("News updated successfully");
        return true;
      } else {
        setError(response.error);
        toast.error(response.error || "Failed to update news");
        return false;
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error updating news");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNewsById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await newsService.getNewsById(id);
      if (response.success) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        setError(response.error);
        toast.error(response.error || "Failed to fetch news");
        return {
          success: false,
          error: response.error,
        };
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error loading news");
      return {
        success: false,
        error: err.message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    news,
    isLoading,
    error,
    selectedNews,
    actions: {
      fetchNews,
      createNews,
      selectNews,
      clearSelection,
      clearError,
      deleteNews,
      updateNews,
      getNewsById,
    },
  };
};
