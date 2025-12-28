import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { store, product } = body;

    const userAgent = headers().get("user-agent");

    if (!store && !product) {
      return NextResponse.json({ ok: true, skipped: true });
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
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}

