import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s",
      { next: { revalidate: 3600 } },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const images = Object.values(data.data)
      .map((item: any) => item.dhd || item.s)
      .filter((url): url is string => typeof url === "string")

    return NextResponse.json({ images })
  } catch (error) {
    return NextResponse.json({ error: "Error proxying image" }, { status: 500 })
  }
}
