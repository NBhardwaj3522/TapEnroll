import { NextResponse } from "next/server";
import { supabase } from "../_lib/supabase";
import { sendSMS } from "../_lib/sms";

export async function POST(req: Request) {
  const userAgent = null; 
 
  const body = await req.json();
  const { phone, store } = body;

  if (!phone) {
    return NextResponse.json({ error: "Phone required" }, { status: 400 });
  }

  const { data: member, error } = await supabase
    .from("members")
    .upsert({ phone }, { onConflict: "phone" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("tap_events").insert({
    store_code: store,
    member_id: member.id,
  });

  await sendSMS(
    phone,
    "Thanks for joining! 🎉 Show this message for your reward."
  );

  return NextResponse.json({ success: true });
}

