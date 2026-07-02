import { Metadata } from "next";
import TestPagesClient from "./TestPagesClient";

export const metadata: Metadata = {
  title: "Test Pages | Inspire Techno Solution",
  description: "Inspire Techno Solution static testing page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestPages() {
  return <TestPagesClient />;
}
