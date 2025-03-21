"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Logo from "@/public/logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        console.log("Tally script loaded");
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6'>
      <motion.div
        className='flex justify-center pt-10'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Image src={Logo} alt='Waivify Logo' width={200} height={200} />
      </motion.div>

      <motion.section
        className='max-w-4xl mx-auto text-center py-16'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className='md:leading-[1.1] text-5xl md:text-6xl font-bold text-teal-400 '>
          Ditch the Paperwork. Get Waivers Signed in Seconds.
        </h1>
        <p className='text-lg my-8 text-gray-300'>
          A simple, mobile-friendly way for businesses to collect digital
          signatures — anywhere, anytime.
        </p>
        <Button
          data-tally-open={process.env.NEXT_PUBLIC_TALLY_ID}
          data-tally-layout='modal'
          data-tally-width='500'
          data-tally-overlay='1'
          data-tally-emoji-text='👋'
          data-tally-emoji-animation='wave'
          size='lg'
          className='bg-teal-500 transform transition duration-200 ease-in-out hover:bg-teal-400 hover:scale-105 hover:shadow-xl'
        >
          Join the Waitlist
        </Button>
      </motion.section>

      <motion.section
        className='max-w-3xl mx-auto py-12'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-8 text-center text-teal-400'>
          Perfect for:
        </h2>
        <ul className='grid grid-cols-2 gap-4 text-left list-disc list-inside text-gray-300'>
          <li>Tattoo Shops</li>
          <li>Yoga & Fitness Studios</li>
          <li>Pet Groomers</li>
          <li>Tour Guides & Rentals</li>
          <li>Small Clinics</li>
          <li>Personal Care Pros</li>
        </ul>
      </motion.section>

      <motion.section
        className='max-w-5xl mx-auto py-16'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold text-center mb-8 text-teal-400'>
          How It Works
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                📝 Create branded waivers
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                📲 Share with a link or QR code
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                ✍️ Clients sign on any device
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                🗂️ Store & download waivers
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className='max-w-4xl mx-auto py-12 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-8 text-teal-400'>
          Why You’ll Love It
        </h2>
        <ul className='list-disc list-inside space-y-2 text-gray-300'>
          <li>No paper or PDFs</li>
          <li>Works on any device</li>
          <li>Legally binding signatures</li>
          <li>All waivers in one place</li>
          <li>Go live in under 10 minutes</li>
        </ul>
      </motion.section>

      <motion.section
        className='bg-gray-800 py-16 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-4xl font-bold mb-4 text-teal-400'>
          Be among the first to simplify your waivers.
        </h2>
        <p className='mb-6 text-gray-300'>
          Join the waitlist — it's free, and we’ll notify you as soon as we’re
          live.
        </p>
        <Button
          data-tally-open={process.env.NEXT_PUBLIC_TALLY_ID}
          data-tally-layout='modal'
          data-tally-width='500'
          data-tally-overlay='1'
          data-tally-emoji-text='👋'
          data-tally-emoji-animation='wave'
          size='lg'
          className='bg-teal-500 transform transition duration-200 ease-in-out hover:bg-teal-400 hover:scale-105 hover:shadow-xl'
        >
          Join the Waitlist
        </Button>
      </motion.section>

      <footer className='text-center text-sm py-6 text-gray-400'>
        Made with ❤️ for service businesses · Privacy Policy · Contact Us
      </footer>
    </div>
  );
}
