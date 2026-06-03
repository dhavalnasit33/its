"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import apiService from "@/lib/apiService";
import Loader from "@/components/PageLoader";
import NotFoundPage from "@/components/NotFoundPage";

interface PageData {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image?: string;
}

export default function GenericPageClient() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<PageData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const response = await apiService<{ success: boolean; data: PageData }>(
          `/page/public/slug/${slug}`,
          { method: "GET" }
        );
        if (response && response.success && response.data) {
          setData(response.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching generic page:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPageData();
    }
  }, [slug]);

  if (loading) return <Loader />;

  if (notFound || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="relative w-full py-20 md:py-28 common_background_gradient">
        {/* Blurred decorative element */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[80vw] max-w-xl aspect-square bg-white/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            {data.title}
          </h1>
          <div className="mt-4">
            <Image
              src="/iphone-app/stylish-underline.svg"
              alt="underline"
              width={160}
              height={10}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          {data.image && (
            <div className="w-full relative h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
            </div>
          )}

          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base md:text-lg
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
              [&_li]:mb-2 [&_strong]:text-slate-900 [&_strong]:font-semibold
              [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline [&_a]:font-medium"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </section>
    </main>
  );
}
