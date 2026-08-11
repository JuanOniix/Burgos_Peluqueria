"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { VerticalLabel } from "@/components/shared/VerticalLabel";
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />

      <div className="absolute top-1/2 left-3 z-10 hidden -translate-y-1/2 sm:block lg:left-6">
        <VerticalLabel className="text-white/70">
          Cali · Colombia
        </VerticalLabel>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-6xl px-4 py-32 sm:px-6 lg:px-16"
      >
        <p className="text-sm font-medium tracking-[0.3em] text-white/75 uppercase">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-5 font-heading text-[3.4rem] leading-[0.95] font-medium tracking-tight text-white sm:text-8xl lg:text-[8.5rem]">
          Burgos
          <br />
          Peluquería
        </h1>
        <p className="mt-8 max-w-md text-lg text-white/85">
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

        <div className="mt-12 flex items-center gap-3 border-t border-white/20 pt-6">
          <span className="font-heading text-3xl font-medium text-white">
            {siteConfig.stats.happyClients}
          </span>
          <span className="max-w-[10rem] text-xs text-white/70">
            {siteConfig.stats.happyClientsLabel}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
