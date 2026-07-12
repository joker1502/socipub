import { NextRequest, NextResponse } from "next/server"
import { getCreemClient, PRODUCT_IDS } from "@/lib/creem"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const plan = searchParams.get("plan")
  const userId = searchParams.get("userId")

  if (!plan || !(plan in PRODUCT_IDS)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
  }

  const productId = PRODUCT_IDS[plan as keyof typeof PRODUCT_IDS]
  if (!productId) {
    return NextResponse.json({ error: "Product not configured" }, { status: 500 })
  }

  const creem = getCreemClient()

  const checkout = await creem.checkouts.create({
    productId,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    metadata: userId ? { user_id: userId } : undefined,
  })

  if (!checkout.checkoutUrl) {
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }

  return NextResponse.redirect(checkout.checkoutUrl)
}
