import { NextResponse } from "next/server";
import { supabase } from "../_lib/supabase";
import { headers } from "next/headers";
import { sendSMS } from "../_lib/sms";

  // 1️⃣ Parse request

export async function POST(req: Request) {
  const body = await req.json();
  console.log("ENROLL BODY", body);

  const { phone, store } = body;
  const userAgent = req.headers.get("user-agent");


  if (!phone) {
    return NextResponse.json(
      { error: "Phone required" },
      { status: 400 }
    );
  }

  // 2️⃣ Create or find member
  const { data: member, error: memberError } = await supabase
    .from("members")
    .upsert({ phone }, { onConflict: "phone" })
    .select()
    .single();

  if (memberError) {
    return NextResponse.json(
      { error: memberError.message },
      { status: 500 }
    );
  }

  // 3️⃣ Log the tap
  await supabase.from("tap_events").insert({
    store_code: store,
    member_id: member.id,
     user_agent: userAgent,

 });

  // 4️⃣ SEND THE SMS  ← ← ← THIS IS WHERE IT GOES
  await sendSMS(
    phone,
    "Thanks for joining! 🎉 Show this message for your reward."
  );

  // 5️⃣ Respond to the client
  return NextResponse.json({ ok: true });
}


