'use client'

import React from 'react';
import Image from 'next/image';
import close from "@/public/svg/close-black-bold.svg";

const AddBlockModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-[600px] sm:max-w-[800px] overflow-auto scrollbar-hide max-h-[90%]">
                {/* Заголовок модального окна */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">
                        Добавить новый блок
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <Image
                            src={close}
                            width={40}
                            height={40}
                            quality={100}
                            alt={'Закрыть блок'}
                            className="w-full h-auto object-cover max-w-[40px]"
                        />
                    </button>
                </div>

                {/* Переключатель языка */}
                <div className="flex justify-center mt-4">
                    <button
                        className={`px-4 py-2 rounded-l bg-gray-200 text-gray-700`}
                        disabled
                    >
                        Русский
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r bg-gray-200 text-gray-700`}
                        disabled
                    >
                        Ozbek
                    </button>
                </div>

                {/* Формы для добавления */}
                <div className="mb-4 p-6">
                    {/* Заголовок */}
                    <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
                        Заголовок (Русский)
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title_ru"
                        value="Пример заголовка на русском"
                        className="w-full border rounded px-3 py-2 mb-4"
                        readOnly
                    />

                    <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
                        Заголовок (Uzbek)
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title_uz"
                        value="Пример заголовка на узбекском"
                        className="w-full border rounded px-3 py-2 mb-4"
                        readOnly
                    />

                    {/* Текст */}
                    <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
                        Текст (Русский)
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="body_ru"
                        value="Пример текста на русском."
                        className="w-full border rounded px-3 py-2 mb-4"
                        rows={4}
                        readOnly
                    />

                    <label className="block text-sm font-medium mb-1 text-[#A6A6A6]">
                        Текст (Uzbek)
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="body_uz"
                        value="Пример текста на узбекском."
                        className="w-full border rounded px-3 py-2 mb-4"
                        rows={4}
                        readOnly
                    />

                    {/* Фото */}
                    <label className="block text-lg mb-1 text-[#010101] font-bold">
                        Фото (обязательно)
                    </label>
                    <div className="relative mb-4">
                        <Image
                            src="/images/News/sample-image.png" // Статическое изображение
                            alt={"Текущее фото"}
                            width={300}
                            height={200}
                            className="object-cover w-full h-auto rounded"
                        />
                        <button
                            className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 cursor-not-allowed"
                            disabled
                            title={'Удалить фото'}
                        >
                            <Image
                                src={close}
                                width={20}
                                height={20}
                                alt={'Удалить фото'}
                            />
                        </button>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full mb-4"
                        disabled
                    />
                </div>

                {/* Сообщение об ошибке (если необходимо) */}
                {/* 
                <div className="mb-4 p-4 text-center rounded bg-red-100 text-red-700 mx-6">
                    Пример сообщения об ошибке.
                </div>
                */}

                {/* Кнопки подтверждения и отмены */}
                <div className="flex justify-end gap-2 bg-[#F9F9F9] h-[95px] items-center p-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-3 bg-gray-300 hover:bg-gray-400 w-[150px]"
                        disabled
                    >
                        Отмена
                    </button>
                    <button
                        className="py-3 bg-[#00863E] text-white w-[150px] cursor-not-allowed opacity-50"
                        disabled
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlockModal;
