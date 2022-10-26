// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {createClient} from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    // @ts-ignore
    const supabase = createClient(url, anonKey)

    const { data, error } = await supabase.from("movies").select("*").eq("id", req.query.id)

    res.status(200).json({ data, error })
}
