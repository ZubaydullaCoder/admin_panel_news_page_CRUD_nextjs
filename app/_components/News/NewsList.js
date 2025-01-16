"use client";

import React, { useEffect, useState } from "react";
import { useNews } from "@/app/_context/NewsContext";
import Image from "next/image";
import plus from "@/public/svg/plus-white.svg";
import plus_green from "@/public/svg/plus-green.svg";
import CreateNewsModal from "./CreateNewsModal";
import NewCardMain from "./NewCardMain";
import EditNewsModal from "./EditNewsModal";
import { useRouter } from "next/navigation";

export default function NewsList() {
  const router = useRouter();
  const {
    news,
    isLoading,
    actions: { fetchNews, createNews, deleteNews, updateNews },
  } = useNews();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [locale, setLocale] = useState("ru");

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleCreateNews = async (newsData) => {
    const success = await createNews(newsData);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    if (window.confirm("Are you sure you want to delete this news item?")) {
      await deleteNews(id);
    }
  };

  const handleEdit = (newsItem, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedNews(newsItem);
    setIsEditModalOpen(true);
  };

  const handleUpdateNews = async (id, newsData) => {
    try {
      const success = await updateNews(id, newsData);
      if (success) {
        setIsEditModalOpen(false);
        setSelectedNews(null);
      }
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  const switchLocale = (newLocale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
  };

  const handleNewsClick = (id, e) => {
    e.preventDefault();
    router.push(`/news/${id}`);
  };

  if (isLoading) {
    return <div className="w-full flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px]">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-[30px] mdx:text-[40px] mdl:text-[43px] xl:text-[50px] font-bold">
          {locale === "ru" ? "Новости" : "Yangiliklar"}
        </h2>

        {/* Language switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => switchLocale("ru")}
            className={`px-4 py-2 ${
              locale === "ru"
                ? "bg-[#00863E] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Русский
          </button>
          <button
            onClick={() => switchLocale("uz")}
            className={`px-4 py-2 ${
              locale === "uz"
                ? "bg-[#00863E] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Ozbek
          </button>
        </div>

        {/* Add news button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00863E] text-white h-[50px] w-[223px] text-[16px] font-extrabold flex items-center justify-center gap-[8px] hover:bg-[#27a361]"
        >
          {locale === "ru" ? "Добавить новость" : "Yangilik qo'shish"}
          <Image
            src={plus}
            width={28}
            height={28}
            quality={100}
            alt={locale === "ru" ? "Добавить новость" : "Yangilik qo'shish"}
            className="w-full h-auto object-cover max-w-[28px]"
          />
        </button>
      </div>

      {/* News grid */}
      <div className="w-full grid gap-y-[35px] mdx:gap-y-[45px] xl:gap-y-[55px] gap-x-4 grid-cols-1 mdl:grid-cols-2 xl:grid-cols-4 h-auto">
        {news.map((item) => (
          <div key={item.id} className="relative">
            <div
              onClick={(e) => handleNewsClick(item.id, e)}
              className="cursor-pointer"
            >
              <NewCardMain
                title={item.title}
                subtitle={item.content}
                date={item.publicationDate}
                imageSrc={item.imageUrl}
              />
            </div>
            <button
              onClick={(e) => handleDelete(item.id, e)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              title="Delete news"
            >
              ×
            </button>
            {/* Edit button in news card */}
            <button
              onClick={(e) => handleEdit(item, e)}
              className="absolute top-2 right-12 bg-[#00863E] text-white p-2 rounded-full hover:bg-[#27a361]"
              title="Edit news"
            >
              ✎
            </button>
          </div>
        ))}

        {/* Add news card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-[344px] w-auto border-[2px] border-dashed border-[#00863E] hover:border-[#2dbd70] flex flex-col-reverse items-center justify-center text-[22px] font-semibold text-[#00863E] hover:text-[#27a361]"
        >
          {locale === "ru" ? "Добавить новость" : "Yangilik qo'shish"}
          <Image
            src={plus_green}
            width={28}
            height={28}
            quality={100}
            alt={locale === "ru" ? "Добавить новость" : "Yangilik qo'shish"}
            className="w-full h-auto object-cover max-w-[28px]"
          />
        </button>
      </div>

      {/* Create news modal */}
      {isModalOpen && (
        <CreateNewsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreateNews}
          locale={locale}
        />
      )}
      {isEditModalOpen && selectedNews && (
        <EditNewsModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedNews(null);
          }}
          onSave={handleUpdateNews}
          locale={locale}
          newsItem={selectedNews}
        />
      )}
    </div>
  );
}
