import { NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode'

export const getDataFromToken = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error: unknown) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
};