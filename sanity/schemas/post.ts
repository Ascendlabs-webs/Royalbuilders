import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog / News Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "body", title: "Content", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published Date", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "coverImage", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "seoTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "seoDescription", title: "Meta Description", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
