import { SITE_DESCRIPTION, SITE_EMOJI, SITE_NAME } from '@/utils/site'
import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div tw='flex flex-col items-center justify-center bg-slate-800 text-white w-full h-full p-4'>
        <h1 style={{ fontSize: 128 }} tw='m-0 p-0'>
          {SITE_EMOJI}
        </h1>
        <h2 style={{ fontSize: 64 }} tw='m-0 p-0'>
          {SITE_NAME}
        </h2>
        <p style={{ fontSize: 28 }} tw='text-slate-400 mb-12'>{SITE_DESCRIPTION}</p>
      </div>
    )
  )
}
