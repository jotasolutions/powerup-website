"use client"

import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react"
import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from "react"

import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"
import { websiteBenefits } from "./website-section-data"

const PHONE_FRAME_SRC = "/videos/iphone17-black.png"

function usePanelScrollProgress(panelRef: RefObject<HTMLElement | null>) {
  return useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  }).scrollYProgress
}

function usePanelReveal(panelRef: RefObject<HTMLElement | null>) {
  const scrollYProgress = usePanelScrollProgress(panelRef)

  // Texto: aparece al centrar el panel y se mantiene casi hasta el siguiente
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.78, 1], [0, 1, 1, 0])

  return { opacity }
}

function useScreenshotReveal(panelRef: RefObject<HTMLElement | null>) {
  const scrollYProgress = usePanelScrollProgress(panelRef)

  // Entra desde abajo con fade; se queda fija y solo se desvanece al final
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.82, 1], [0, 1, 1, 0])

  return { opacity }
}

function BenefitIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="from-primary/10 to-primary/20 flex size-[3.75rem] shrink-0 items-center justify-center rounded-lg border bg-gradient-to-b">
      <Icon className="size-8 stroke-[1.5] text-primary" aria-hidden />
    </div>
  )
}

function PanelAnimatedContent({
  sectionRef,
  title,
  description,
  icon,
  side,
}: {
  sectionRef: RefObject<HTMLElement | null>
  title: string
  description: string
  icon: LucideIcon
  side: "left" | "right"
}) {
  const { opacity, y } = usePanelReveal(sectionRef)

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "w-full max-w-xs space-y-4 lg:max-xl:max-w-[18.75rem]",
        side === "left"
          ? "mr-auto ml-8 lg:ml-0"
          : "mr-8 ml-auto md:mr-auto md:ml-8 lg:mr-0 lg:ml-auto",
      )}
    >
        <BenefitIcon icon={icon} />
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-800 text-base">{description}</p>
    </motion.div>
  )
}

function ScrollFeaturePanel({
  title,
  description,
  icon,
  side,
  onReady,
}: {
  title: string
  description: string
  icon: LucideIcon
  side: "left" | "right"
  onReady: (ref: RefObject<HTMLElement | null>) => void
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useLayoutEffect(() => {
    setIsMounted(true)
    onReadyRef.current(sectionRef)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center pt-16 lg:pt-20"
    >
      {isMounted ? (
        <PanelAnimatedContent
          sectionRef={sectionRef}
          title={title}
          description={description}
          icon={icon}
          side={side}
        />
      ) : (
        <div
          className={cn(
            "w-full max-w-xs space-y-4 opacity-0 lg:max-xl:max-w-[18.75rem]",
            side === "left"
              ? "mr-auto ml-8 lg:ml-0"
              : "mr-8 ml-auto md:mr-auto md:ml-8 lg:mr-0 lg:ml-auto",
          )}
        >
          <div className="flex items-center gap-4">
            <BenefitIcon icon={icon} />
            <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      )}
    </section>
  )
}

function PhoneScreenshot({
  panelRef,
  src,
  alt,
}: {
  panelRef: RefObject<HTMLElement | null>
  src: string
  alt: string
}) {
  const { opacity, y } = useScreenshotReveal(panelRef)

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-y-[10%] left-[10%] z-10 h-[80%] w-[80%] overflow-hidden rounded-[1.9rem]"
    >
      <Image
        src={src}
        alt={alt}
        width={1170}
        height={3018}
        className="size-full object-cover object-top"
        sizes="(max-width: 768px) 184px, 295px"
      />
    </motion.div>
  )
}

function StickyPhoneMockup({
  panelRefs,
  showScreenshots,
}: {
  panelRefs: Array<RefObject<HTMLElement | null> | null>
  showScreenshots: boolean
}) {
  return (
    <div className="pointer-events-none sticky top-4 z-10 flex justify-center md:top-0 md:h-screen md:items-center md:justify-end lg:justify-center">
      <div className="relative aspect-[15/32] w-full max-w-52 md:max-lg:scale-80 md:max-w-[20.75rem]">
        {showScreenshots
          ? websiteBenefits.map((item, index) => {
              const panelRef = panelRefs[index]
              if (!panelRef) return null

              return (
                <PhoneScreenshot
                  key={item.title}
                  panelRef={panelRef}
                  src={item.image}
                  alt={item.title}
                />
              )
            })
          : null}
        <Image
          src={PHONE_FRAME_SRC}
          alt="Marco de móvil"
          fill
          className="pointer-events-none z-20 object-contain"
          sizes="(max-width: 768px) 208px, 332px"
          priority
        />
      </div>
    </div>
  )
}

export function WebsiteBenefitsSection() {
  const panelRefs = useRef<Array<RefObject<HTMLElement | null> | null>>(
    Array.from({ length: websiteBenefits.length }, () => null),
  )
  const [readyCount, setReadyCount] = useState(0)

  const handlePanelReady = useCallback(
    (index: number, ref: RefObject<HTMLElement | null>) => {
      if (panelRefs.current[index]) return

      panelRefs.current[index] = ref
      setReadyCount(
        panelRefs.current.filter((panelRef) => panelRef !== null).length,
      )
    },
    [],
  )

  const panelsReady = readyCount === websiteBenefits.length

  return (
    <section
      id="website-benefits"
      data-track-section="website-benefits"
      data-track-location="website-benefits"
      className="w-full mx-auto pt-8 max-sm:pb-[7.5rem] sm:pt-16 lg:pt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
          <BlurFade inView inViewMargin="-80px" delay={0.05}>
            <h2 className="landing-section-title mx-auto max-w-lg text-2xl md:text-3xl lg:text-4xl">
              Una web hecha para restaurantes, no para programadores
            </h2>
          </BlurFade>
        </div>

        <div className="relative">
          <StickyPhoneMockup
            panelRefs={panelRefs.current}
            showScreenshots={panelsReady}
          />

          <div className="relative max-md:mt-[55vh] md:-mt-[100vh]">
            <div aria-hidden className="min-h-[70vh] md:min-h-screen" />
            {websiteBenefits.map((item, index) => (
              <ScrollFeaturePanel
                key={item.title}
                onReady={(ref) => handlePanelReady(index, ref)}
                side={index % 2 === 0 ? "left" : "right"}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
            <div aria-hidden className="min-h-[40vh] md:min-h-[50vh]" />
          </div>
        </div>

        <div className="mt-10 flex justify-center pb-12 md:mt-14 md:pb-20">
          <CTAButton label="Crear mi web gratis" location="website_benefits" icon={null} />
        </div>
      </div>
    </section>
  )
}
