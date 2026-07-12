import { Webhook } from "@creem_io/nextjs"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export const POST = Webhook({
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
  onCheckoutCompleted: async ({ customer, metadata }) => {
    if (!customer) return
    const userId = metadata?.user_id as string | undefined
    if (!userId) return
    const supabase = getSupabase()
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      creem_customer_id: customer.id,
      subscription_status: "active",
    })
    if (error) console.error("Failed to upsert profile:", error)
  },
  onGrantAccess: async ({ customer, metadata }) => {
    if (!customer) return
    const userId = metadata?.user_id as string | undefined
    if (!userId) return
    const supabase = getSupabase()
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      creem_customer_id: customer.id,
      subscription_status: "active",
    })
    if (error) console.error("Failed to grant access:", error)
  },
  onRevokeAccess: async ({ customer, metadata }) => {
    if (!customer) return
    const userId = metadata?.user_id as string | undefined
    if (!userId) return
    const supabase = getSupabase()
    const { error } = await supabase.from("profiles").update({
      subscription_status: "inactive",
    }).eq("id", userId)
    if (error) console.error("Failed to revoke access:", error)
  },
})
