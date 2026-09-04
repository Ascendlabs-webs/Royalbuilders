import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings (banners, testimonials, FAQs)",
  type: "document",
  fields: [
    defineField({
      name: "heroBanners",
      title: "Homepage Hero Banners",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", type: "string", title: "Title" },
          { name: "subtitle", type: "string", title: "Subtitle" },
          { name: "image", type: "image", title: "Image", options: { hotspot: true } },
          { name: "ctaLabel", type: "string", title: "CTA Label" },
          { name: "ctaHref", type: "string", title: "CTA Link" },
        ],
      }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", type: "string", title: "Name" },
          { name: "text", type: "text", title: "Text", rows: 3 },
          { name: "service", type: "string", title: "Service" },
        ],
      }],
    }),
    defineField({
      name: "faqs",
      title: "Global FAQs",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "q", type: "string", title: "Question" },
          { name: "a", type: "text", title: "Answer", rows: 3 },
        ],
      }],
    }),
  ],
});
