'use client'

import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function CTAButton() {
  return (
    <Button className="w-full sm:w-auto" >
      <QrCode className="size-4" />
      Crear carta gratis
    </Button>
  )
}