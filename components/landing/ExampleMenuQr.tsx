'use client'

import { QRCode } from "antd"

export const EXAMPLE_MENU_URL = "https://carta.powerup.menu/trpico-brunch-barcelona-balmes?utm_source=homepage&utm_medium=qr_code_widget"

type ExampleMenuQrProps = {
  size?: number
  className?: string
}

export function ExampleMenuQr({ size = 72, className }: ExampleMenuQrProps) {
  return (
    <div className={className}>
      <QRCode
        value={EXAMPLE_MENU_URL}
        size={size}
        bordered={false}
        color="#ffffff"
        bgColor="transparent"
        errorLevel="L"
      />
    </div>
  )
}
