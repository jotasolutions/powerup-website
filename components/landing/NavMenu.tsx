"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Menu, QrCode, X } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Evalua tu carta", href: "#advisor" },
  { label: "Precios", href: "#pricing" },
  { label: "Vende mas", href: "#vende-mas" },
]

const loginUrl = "https://admin.powerup.menu/sign-in"
const signUpUrl = "https://admin.powerup.menu/sign-up"

const SCROLL_RANGE: [number, number] = [0, 64]
const springConfig = { stiffness: 420, damping: 42, mass: 0.55 }

export function NavMenu() {
  const { scrollY } = useScroll()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const maxWidthRaw = useTransform(scrollY, SCROLL_RANGE, [1450, 960])
  const borderRadiusRaw = useTransform(scrollY, SCROLL_RANGE, [0, 16])
  const paddingXRaw = useTransform(scrollY, SCROLL_RANGE, [0, 8])
  const shellOpacity = useTransform(scrollY, SCROLL_RANGE, [0, 1])

  const maxWidth = useSpring(maxWidthRaw, springConfig)
  const borderRadius = useSpring(borderRadiusRaw, springConfig)
  const paddingX = useSpring(paddingXRaw, springConfig)

  const maxWidthPx = useTransform(maxWidth, (value) => `${value}px`)
  const borderRadiusPx = useTransform(borderRadius, (value) => `${value}px`)
  const paddingXPx = useTransform(paddingX, (value) => `${value}px`)

  useEffect(() => {
    if (!isMobileOpen) return

    const closeMenu = () => setIsMobileOpen(false)
    window.addEventListener("resize", closeMenu)

    return () => window.removeEventListener("resize", closeMenu)
  }, [isMobileOpen])

  return (
    <header className="sticky top-4 z-50 px-2 sm:px-4 mb-2">
      <motion.div
        className="relative mx-auto w-full"
        style={{
          maxWidth: maxWidthPx,
          borderRadius: borderRadiusPx,
          paddingLeft: paddingXPx,
          paddingRight: paddingXPx,
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-background/70 shadow-md backdrop-blur-md"
          style={{ opacity: shellOpacity, borderRadius: borderRadiusPx }}
        />

        <div className="grid h-13 grid-cols-[1fr_auto] items-center gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <Image src="/images/isotipo-negativo.png" alt="PowerUp Menu" width={20} height={20} className="object-contain" />
            </div>
            <Image
              src="/images/powerup-logo.png"
              alt="PowerUp Menu"
              width={130}
              height={32}
              className="h-3 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:block" aria-label="Navegacion principal">
            <ul className="flex items-center  p-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <Link
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Login
            </Link>
            <Link
              href={signUpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <QrCode className="size-4" />
              Crea tu carta
            </Link>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label={isMobileOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {isMobileOpen ? (
          <div className="border-t border-border pb-3 pt-2 md:hidden">
            <nav aria-label="Navegacion principal mobile">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={`mobile-${item.href}`}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "ghost", className: "w-full" })}
              >
                Login
              </Link>
              <Link
                href={signUpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "default", className: "w-full", size: "sm" })}
              >
                Crea tu carta
              </Link>
            </div>
          </div>
        ) : null}
      </motion.div>
    </header>
  )
}
