// app/news/[slug]/page.js
"use client";

import { useEffect, useState } from "react";
import { useNews } from "@/app/_context/NewsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditNewsModal from "@/app/_components/News/EditNewsModal";

export default function NewsDetailPage({ params }) {
  const router = useRouter();
  const {
    actions: { getNewsById, deleteNews, updateNews },
  } = useNews();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState("ru");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNewsById(params.slug);
        if (response.success) {
          setNews(response.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchNews();
    }
  }, [params.slug, getNewsById]);

  const handleDelete = async () => {
    if (
      window.confirm(locale === "ru" ? "Вы уверены?" : "Ishonchingiz komilmi?")
    ) {
      try {
        const success = await deleteNews(news.id);
        if (success) {
          router.push("/news");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  const handleUpdateNews = async (id, newsData) => {
    try {
      const success = await updateNews(id, newsData);
      if (success) {
        setIsEditModalOpen(false);
        // Refresh news data
        const response = await getNewsById(id);
        if (response.success) {
          setNews(response.data);
        }
      }
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  if (loading) {
    return <div className="w-full flex justify-center p-8">Loading...</div>;
  }

  if (!news) {
    return <div className="w-full flex justify-center p-8">News not found</div>;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="text-[20px] text-[#00863E] font-bold hover:text-[#2c8d59] mb-6"
      >
        {locale === "ru" ? "Назад" : "Orqaga"}
      </button>

      <div className="w-full max-w-[1035px] mx-auto">
        <div className="mb-4">
          <p className="font-medium text-[16px] mdx:text-[18px] xl:text-[20px] text-[#00863E]">
            {new Date(news.publicationDate).toLocaleDateString(
              locale === "ru" ? "ru-RU" : "uz-UZ",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        </div>

        <h1 className="text-[25px] font-bold text-black mb-6 mdx:text-[35px] xl:text-[40px] 2xl:text-[50px] leading-[1.10]">
          {news.title}
        </h1>

        {news.imageUrl && (
          <div className="w-full max-w-[1035px] h-[500px] mb-8 relative">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              quality={100}
              className="object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p className="text-[15px] mdx:text-[20px] py-[15px] font-semibold text-[#333333]">
            {news.content}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-6 py-3 bg-[#00863E] text-white rounded hover:bg-[#27a361] transition-colors"
          >
            {locale === "ru" ? "Редактировать" : "Tahrirlash"}
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            {locale === "ru" ? "Удалить" : "O'chirish"}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditNewsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateNews}
          locale={locale}
          newsItem={news}
        />
      )}
    </div>
  );
}
