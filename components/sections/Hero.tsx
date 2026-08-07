"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
        alt="Interior moderno de Burgos Peluquería"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-4 font-heading text-5xl font-medium tracking-tight text-white sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-6 text-lg text-white/85">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppButton size="lg" className="text-base" />
            <Link
              href="#servicios"
              className="text-sm font-medium text-white/90 underline underline-offset-4 hover:text-white"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
