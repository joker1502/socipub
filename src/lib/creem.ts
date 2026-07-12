import { Creem } from "creem"

export function getCreemClient() {
  return new Creem({
    apiKey: process.env.CREEM_API_KEY!,
  })
}

export const PRODUCT_IDS = {
  PRO_MONTHLY: process.env.CREEM_PRODUCT_PRO_MONTHLY!,
  PRO_YEARLY: process.env.CREEM_PRODUCT_PRO_YEARLY!,
  TEAM_MONTHLY: process.env.CREEM_PRODUCT_TEAM_MONTHLY!,
  TEAM_YEARLY: process.env.CREEM_PRODUCT_TEAM_YEARLY!,
  AI_CREDITS: process.env.CREEM_PRODUCT_AI_CREDITS!,
} as const

export type PlanTier = keyof typeof PRODUCT_IDS
