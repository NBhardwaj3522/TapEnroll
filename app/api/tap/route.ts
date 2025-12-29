import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const { store, product } = await req.json();
  const userAgent = headers().get("user-agent");

  if (!store && !product) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from("tap_events").insert({
    store_code: store,
    product_code: product,
    user_agent: userAgent,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

