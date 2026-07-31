"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./HomeBannerCarousel.module.scss";

// ═══════════════════════════════════════════════════════════════
// HomeBannerCarousel
// Carrossel de banners promocionais com autoplay e navegação manual.
// ═══════════════════════════════════════════════════════════════

interface BannerSlide {
  src: string;
  alt: string;
}

const SLIDES: BannerSlide[] = [
  { src: "/banner-BlueFoot.png", alt: "Bluefoot" },
  { src: "/banner1-BlueFoot.png", alt: "Compre sua conta" },
  { src: "/banner2-BlueFoot.png", alt: "Nossos influenciadores" },
];

const SLIDESMobile: BannerSlide[] = [
  { src: "/banner-BlueFoot-Mobile.png", alt: "BlueFoot" },
  { src: "/banner1-BlueFoot-Mobile.png", alt: "Compre sua conta" },
  { src: "/banner2-BlueFoot-Mobile.png", alt: "Nossos influenciadores" },
];

const AUTOPLAY_INTERVAL = 5_000;
const RESUME_DELAY = 8_000;

export default function HomeBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = SLIDES.length;

  // ── Navegação ──────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      setPrev(current);
      setCurrent(index);
    },
    [current],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % total);
  }, [current, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total);
  }, [current, total, goTo]);

  // ── Autoplay ──────────────────────────────────────────────
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
  }, [goNext]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const pauseAndResume = useCallback(() => {
    stopAutoplay();

    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
    }

    resumeRef.current = setTimeout(startAutoplay, RESUME_DELAY);
  }, [stopAutoplay, startAutoplay]);

  // Inicia autoplay na montagem
  useEffect(() => {
    startAutoplay();

    return () => {
      stopAutoplay();
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [startAutoplay, stopAutoplay]);

  // ── Handlers de interação manual ──────────────────────────
  const handlePrev = useCallback(() => {
    goPrev();
    pauseAndResume();
  }, [goPrev, pauseAndResume]);

  const handleNext = useCallback(() => {
    goNext();
    pauseAndResume();
  }, [goNext, pauseAndResume]);

  const handleDot = useCallback(
    (index: number) => {
      if (index === current) return;
      goTo(index);
      pauseAndResume();
    },
    [current, goTo, pauseAndResume],
  );

  // ── Slide class helper ────────────────────────────────────
  const getSlideClass = (index: number) => {
    if (index === current) return `${styles.slide} ${styles.active}`;
    if (index === prev) return `${styles.slide} ${styles.prev}`;
    return styles.slide;
  };

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Banners promocionais"
    >
      <div className={styles.track}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={getSlideClass(index)}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} de ${total}`}
            aria-hidden={index !== current}
          >
            {/* Desktop Banner */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className={`${styles.slideImage} ${styles.desktopOnly}`}
              priority={index === 0}
              unoptimized
            />
            {/* Mobile / Tablet Banner */}
            <Image
              src={SLIDESMobile[index].src}
              alt={SLIDESMobile[index].alt}
              fill
              sizes="100vw"
              className={`${styles.slideImage} ${styles.mobileTabletOnly}`}
              priority={index === 0}
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Navegação Anterior */}
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={handlePrev}
        aria-label="Banner anterior"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Navegação Próximo */}
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={handleNext}
        aria-label="Próximo banner"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores */}
      <div
        className={styles.dots}
        role="tablist"
        aria-label="Selecionar banner"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
            onClick={() => handleDot(index)}
            role="tab"
            aria-selected={index === current}
            aria-label={`Ir para banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
