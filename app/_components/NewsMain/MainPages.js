'use client'

import React, { useState } from 'react';
import Image from "next/image";
import plus_green from "@/public/svg/plus-green.svg";
import EditBlockModal from './EditBlockModal'; // Статическое модальное окно редактирования
import AddBlockModal from './AddBlockModal'; // Статическое модальное окно добавления
import translations from './translations';
import { useRouter } from 'next/navigation';

// Функция для форматирования текста с переносами строк
const formatTextWithNewlines = (text) => {
    if (typeof text === 'string') {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    }
    return null; 
};

export default function MainPages() {
    const router = useRouter();
    const [locale, setLocale] = useState('ru'); // Статическая локаль
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentBlock, setCurrentBlock] = useState(null);

    // Статические данные новости
    const news = {
        id: 1,
        slug: "sample-news",
        createdDate: "2025-01-01T00:00:00Z",
        active: true,
        optionList: [
            {
                id: 1,
                title: {
                    ru: "Вступление на русском",
                    uz: "Tanishuv o'zbekcha",
                },
                body: {
                    ru: "Описание вступления на русском.",
                    uz: "Tanishuv tavsifi o'zbekcha.",
                },
                photo: {
                    url: "/images/News/block1.png",
                },
            },
            {
                id: 2,
                title: {
                    ru: "Блок 1 на русском",
                    uz: "Blok 1 o'zbekcha",
                },
                body: {
                    ru: "Описание блока 1 на русском.",
                    uz: "Blok 1 tavsifi o'zbekcha.",
                },
                photo: {
                    url: "/images/News/block2.png",
                },
            },
            // Добавьте больше статических блоков по необходимости
        ],
    };

    // Функция для смены локали
    const switchLocale = (newLocale) => {
        if (newLocale === locale) return;
        setLocale(newLocale);
    };

    // Функция для открытия модального окна редактирования блока
    const handleEditClick = (block) => {
        setCurrentBlock(block);
        setIsEditModalOpen(true);
    };

    // Функция для закрытия модального окна редактирования блока
    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setCurrentBlock(null);
    };

    // Функция для открытия модального окна добавления блока
    const handleAddBlockClick = () => {
        setIsAddModalOpen(true);
    };

    // Функция для закрытия модального окна добавления блока
    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
    };

    return (
        <>
            <button
                onClick={() => router.back()}
                className='text-[20px] text-[#00863E] font-bold hover:text-[#2c8d59] ml-[200px] w-[40px]'
            >
                {locale === 'ru' ? 'Назад' : 'Orqaga'}
            </button>
            <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
                <div className="w-full 2xl:max-w-[1035px] mx-auto">
                    <div className="mt-4">
                        {news.createdDate && (
                            <p className="font-medium text-[16px] mdx:text-[18px] xl:text-[20px] text-[#00863E]">
                                {new Date(news.createdDate).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'uz-UZ', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        )}

                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {news.optionList?.[0]?.title && (
                                <h1 className="text-[25px] font-bold text-black mb-2 mdx:text-[35px] xl:text-[40px] 2xl:text-[50px] leading-[1.10] mt-2">
                                    {formatTextWithNewlines(
                                        locale === 'ru'
                                            ? news.optionList[0].title.ru
                                            : news.optionList[0].title.uz
                                    )}
                                </h1>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => switchLocale('ru')}
                                    className={`px-4 py-2 ${locale === 'ru' ? 'bg-[#00863E] text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Русский
                                </button>
                                <button
                                    onClick={() => switchLocale('uz')}
                                    className={`px-4 py-2 ${locale === 'uz' ? 'bg-[#00863E] text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Ozbek
                                </button>
                            </div>
                        </div>
                    </div>

                    {news.optionList?.[0]?.photo?.url && (
                        <div className="w-full max-w-[1035px] h-[500px] max-xl:my-[25px] xl:mt-7 xl:mb-[40px] flex justify-center relative">
                            <Image
                                src={news.optionList[0].photo.url}
                                layout="fill" // Используем fill для полного покрытия
                                quality={100}
                                alt={locale === 'ru' ? 'Main News Image' : 'Asosiy Yangilik Tasviri'}
                                className="object-cover" // Обеспечиваем полное покрытие с сохранением пропорций
                            />
                        </div>
                    )}

                    {news.optionList?.map((item, index) => (
                        <div className="mt-[35px] xl:mt-[70px] w-full h-full" key={item.id}>
                            <div className="flex flex-col justify-between items-start">
                                {index !== 0 && item.title && (
                                    <h3 className="text-[20px] mdx:text-[26px] font-bold text-[#252324]">
                                        {formatTextWithNewlines(
                                            locale === 'ru'
                                                ? item.title.ru
                                                : item.title.uz
                                        )}
                                    </h3>
                                )}
                            </div>
                            {item.body && (
                                <p className="text-[15px] mdx:text-[20px] py-[15px] font-semibold text-[#333333]">
                                    {formatTextWithNewlines(
                                        locale === 'ru'
                                            ? item.body.ru
                                            : item.body.uz
                                    )}
                                </p>
                            )}
                            {index !== 0 && item.photo?.url && (
                                <div className="mt-[30px] mb-[10px] flex justify-center relative w-full max-w-[1035px] h-[500px]">
                                    <Image
                                        src={item.photo.url}
                                        layout="fill" // Используем fill для полного покрытия контейнера
                                        quality={100}
                                        alt={locale === 'ru' ? 'Block Image' : 'Blok Tasviri'}
                                        className="object-cover" // Обеспечиваем полное покрытие с сохранением пропорций
                                    />
                                </div>
                            )}

                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className="w-[223px] py-3 bg-[#00863E] hover:bg-[#2f9c62] text-white "
                                >
                                    {index === 0
                                        ? (locale === 'ru' ? 'Редактировать вступление' : 'Tanishuvni tahrirlash')
                                        : (locale === 'ru' ? 'Редактировать блок' : 'Blokni tahrirlash')}
                                </button>
                                <button
                                    className="w-[223px] py-3 bg-red-500 hover:bg-red-700 text-white"
                                    disabled
                                >
                                    {locale === 'ru' ? 'Удалить блок' : 'Blokni o\'chirish'}
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddBlockClick}
                        className='mt-[80px] w-full flex flex-col items-center justify-center h-[198px] border-[3px] border-dashed text-[#00863E] text-[22px] hover:text-[#2c9e61] font-bold'
                        // Удалите атрибут disabled
                    >
                        <Image
                            src={plus_green}
                            width={30}
                            height={30}
                            quality={100}
                            alt={locale === 'ru' ? "Добавить блок" : "Blok qo\'shish"}
                            className="w-[30px] h-[30px]"
                        />
                        {locale === 'ru' ? 'Добавить блок' : 'Blok qo\'shish'}
                    </button>
                </div>
            </div>

            {/* Модальное окно редактирования блока */}
            {isEditModalOpen && (
                <EditBlockModal
                    isOpen={isEditModalOpen}
                    onClose={handleModalClose}
                    // Удалены пропсы blockData, onSave, locale, newsId, newsActive, isFirst
                />
            )}

            {/* Модальное окно добавления блока */}
            {isAddModalOpen && (
                <AddBlockModal
                    isOpen={isAddModalOpen}
                    onClose={handleAddModalClose}
                    // Удалены пропсы onSave, locale, newsId, existingBlocks, fetchNews
                />
            )}
        </>
    )
}
