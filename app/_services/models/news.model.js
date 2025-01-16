export class NewsItem {
  constructor(data = {}) {
    this.id = data.id || Date.now().toString();
    this.title = data.title || "";
    this.content = data.content || "";
    this.imageUrl = data.imageUrl || "";
    this.publicationDate = data.publicationDate || new Date().toISOString();
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.title.trim()) errors.push("Title is required");
    if (!this.content.trim()) errors.push("Content is required");
    if (!this.imageUrl.trim()) errors.push("Image URL is required");

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      imageUrl: this.imageUrl,
      publicationDate: this.publicationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
