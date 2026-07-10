'use client'

import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import Link from "next/link"

export function CTAButton() {
  return (
    <Link href="https://admin.powerup.menu/sign-up">
      <Button className="w-full sm:w-auto h-13 sm:h-10" >
        <QrCode className="size-4" />
        Crear carta gratis
      </Button>
    </Link>
  )
}