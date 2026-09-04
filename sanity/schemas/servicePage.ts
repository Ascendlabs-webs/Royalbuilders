import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicePage",
  title: "Service Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "packages",
      title: "Pricing Packages",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", type: "string", title: "Name" },
          { name: "price", type: "number", title: "Price (₹/sq.ft)" },
          { name: "features", type: "array", title: "Features", of: [{ type: "string" }] },
        ],
      }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "q", type: "string", title: "Question" },
          { name: "a", type: "text", title: "Answer", rows: 3 },
        ],
      }],
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),
  ],
});
