export const SITE = {
  name: "Royal Builders",
  legalName: "Royal Builders - Construction & Real Estate",
  tagline: "Building Dreams Since 2010",
  phoneDisplay: "+91 98409 51292",
  phoneRaw: "919840951292",
  whatsapp: "919840951292",
  email: "Royalbuilderschn@gmail.com",
  address: "No.754/1007, BV Colony, 23rd Street, Chennai - 600039",
  addressLines: [
    "No.754/1007, BV Colony,",
    "23rd Street,",
    "Chennai - 600039",
  ],
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  established: 2010,
  mapEmbed:
    "https://www.google.com/maps?q=No.754%2F1007%2C%20BV%20Colony%2C%2023rd%20Street%2C%20Chennai%20600039&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=No.754%2F1007%2C+BV+Colony%2C+23rd+Street%2C+Chennai+600039",
  hours: "Mon - Sun, 9:00 AM - 8:00 PM",
  socials: {
    facebook: "https://facebook.com/royalbuilderschennai",
    instagram: "https://instagram.com/royalbuilderschennai",
    youtube: "https://youtube.com/@royalbuilderschennai",
    whatsapp: "https://wa.me/919840951292",
    gmb: "https://www.google.com/maps/search/?api=1&query=Royal+Builders+Chennai",
  },
  url: "https://royal-builders.in",
} as const;

export const PHONE_HREF = `tel:+${SITE.phoneRaw}`;
export const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hello Royal Builders, I would like a free consultation for my project."
)}`;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
