'use client'

import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function CTAButton() {
  return (
    <Button >
      <QrCode className="size-4" />
      Crear carta gratis
    </Button>
  )
}