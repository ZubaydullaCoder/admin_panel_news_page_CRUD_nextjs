// app/_components/News/EditNewsModal.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import close from "@/public/svg/close-black-bold.svg";

export default function EditNewsModal({
  isOpen,
  onClose,
  onSave,
  locale,
  newsItem,
}) {
  const [formData, setFormData] = useState({
    title: newsItem.title,
    content: newsItem.content,
    imageUrl: newsItem.imageUrl,
    publicationDate: newsItem.publicationDate,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSave(newsItem.id, formData);
      onClose();
    } catch (error) {
      setError(error.message || "Failed to update news");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-[1236px] overflow-auto scrollbar-hide max-h-[90%]">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {locale === "ru"
              ? "Редактировать новость"
              : "Yangilikni tahrirlash"}
          </h2>
          <button onClick={onClose}>
            <Image
              src={close}
              width={40}
              height={40}
              quality={100}
              alt="Close"
              className="w-full h-auto object-cover max-w-[40px]"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
              {locale === "ru" ? "Заголовок" : "Sarlavha"}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
              {locale === "ru" ? "Содержание" : "Matn"}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
              {locale === "ru" ? "URL изображения" : "Rasm URL"}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {error && (
            <div className="mb-4 p-4 text-center rounded bg-red-100 text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
              disabled={isSubmitting}
            >
              {locale === "ru" ? "Отмена" : "Bekor qilish"}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00863E] text-white hover:bg-[#27a361]"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? locale === "ru"
                  ? "Сохранение..."
                  : "Saqlanmoqda..."
                : locale === "ru"
                ? "Сохранить"
                : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
