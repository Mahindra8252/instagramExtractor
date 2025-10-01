import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  
  if (!imageUrl) {
    return new NextResponse('Profile image URL required', { status: 400 });
  }

  console.log(` [ProfileImageProxy] Fetching profile image: ${imageUrl.substring(0, 100)}...`);

  try {
    // Fetching the profile image from Instagram's CDN to resolve cors on frotnend
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      console.error(` [ProfileImageProxy] Failed to fetch: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch profile image: ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    console.log(` [ProfileImageProxy] Successfully fetched ${imageBuffer.byteLength} bytes`);
    
  
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
  } catch (error) {
    console.error('Error proxying image:', error);
    return new NextResponse('Failed to load image', { status: 500 });
  }
}