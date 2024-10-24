import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Received POST request');

    const customHeaders = Object.fromEntries(request.headers);
    console.log('Custom Headers:', customHeaders);

    const requestBody = await request.json();
    console.log('Request Body:', requestBody);
    const response= await axios.post("http://192.168.0.2:8002/store/update-order-status/", requestBody, {
        headers:{
        'Content-Type': customHeaders['content-type'],
        'Authorization': customHeaders['authorization'],
        }
    })

    return NextResponse.json(
      { message: 'Success', isOk: true,data:response.data},
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching from Django API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
