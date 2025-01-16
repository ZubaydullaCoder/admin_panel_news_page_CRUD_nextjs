export const newsValidation = {
  validateNewsItem(data) {
    const errors = {};

    if (!data.title?.trim()) {
      errors.title = "Title is required";
    } else if (data.title.length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }

    if (!data.content?.trim()) {
      errors.content = "Content is required";
    }

    if (!data.imageUrl?.trim()) {
      errors.imageUrl = "Image URL is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
