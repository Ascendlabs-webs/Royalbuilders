import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore Royal Builders's premium project gallery - luxury villas, apartments, commercial towers and interior transformations delivered across Chennai since 2010.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
