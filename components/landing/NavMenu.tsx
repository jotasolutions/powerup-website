"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, QrCode, X } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
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

export function NavMenu() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30)
  })

  useEffect(() => {
    if (!isMobileOpen) return

    const closeMenu = () => setIsMobileOpen(false)
    window.addEventListener("resize", closeMenu)

    return () => window.removeEventListener("resize", closeMenu)
  }, [isMobileOpen])

  return (
    <header className="sticky top-4 z-50 px-2 sm:px-4">
      <motion.div
        animate={{ width: isScrolled ? "min(60rem, calc(100vw - 1rem))" : "100%" }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="mx-auto"
      >
        <div
          className={cn(
            "relative mx-auto transition-all duration-300",
            isScrolled
              ? "rounded-2xl  bg-background/70 px-3 shadow-md backdrop-blur-md sm:px-2"
              : "max-w-[1500px] px-1 sm:px-0"
          )}
        >
          <div className="grid h-13 grid-cols-[1fr_auto] items-center gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-9 bg-primary rounded-lg flex items-center justify-center">
                <QrCode className="size-4 text-white" />
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
              <ul className="flex items-center gap-1  p-1">
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
        </div>
      </motion.div>
    </header>
  )
}
