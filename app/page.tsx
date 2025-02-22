"use client";

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import { ReviewCard } from "./components/ReviewCard";
import { reviews } from "@/data/reviews";
import { Marquee } from "@/components/magicui/marquee";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Make sure you have these components
import Link from "next/link";
import { faqData } from "@/data/faqData";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { features } from "@/data/features";

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="font-sans antialiased bg-black dark:bg-gray-900">

      {/* Hero Section with Full-Width Background Image */}
      <section className="relative md:h-screen bg-cover md:bg-contain bg-center h-screen items-center justify-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/4161786/pexels-photo-4161786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white py-40 px-6">
          <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn">Welcome to ReelsPro</h1>
          <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-1s">Explore handpicked videos across different genres.</p>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-full text-xl font-semibold hover:bg-yellow-600 transition-all duration-300">Get Started</button>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className=" px-8 text-center bg-black text-white mt-0 mb-0">
      <div className="py-16 px-8 bg-black text-white">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Features</h2>
        <p className="text-lg mt-4">Discover what makes ReelsPro stand out from the crowd.</p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-rounded-xl p-6   transition duration-300 ease-in-out"
          >
            {/* Feature Icon */}
            <div className="flex items-center justify-center bg-yellow-500 text-white p-4 rounded-full w-16 h-16 mb-6 mx-auto">
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-center">{feature.name}</h3>
            <p className="mt-4 text-center text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
      </section>

      {/* Testimonials Section with Image Background */}
      <section className="bg-black  text-white mt-0 mb-0">
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-16 px-20 bg-black text-white ">
        <div className="text-center py-12">
          <h2 className="text-4xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h2>
          <Accordion type="multiple">
            {faqData.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action Section with Image Background */}
      <section className="py-16 px-8 bg-cover  md:bg-contain w-full bg-center " style={{ backgroundImage: "url('https://images.pexels.com/photos/1595238/pexels-photo-1595238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="text-center text-white py-20">
          <h2 className="text-3xl font-bold mb-4">Start Watching Now</h2>
          <p className="text-lg mb-8">Join our community and enjoy unlimited access to videos that inspire and entertain.</p>
          <Link href="/register">
            <button className="text-white px-6 py-3 rounded-full text-xl font-semibold transition-all duration-300">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
