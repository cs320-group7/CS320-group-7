// Import necessary dependencies
import { type NextRequest, NextResponse } from 'next/server';
import { getUser, updateUserName, updateUserEmail, updateUserPassword } from '@/src/db/queries';
import { hash } from 'bcrypt';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = Number(searchParams.get('id'));

  try {
    const user = await getUser(id) as {
      id: number;
      email: string;
      password: string;
      name: string;
    };

    return NextResponse.json({ body: user, status: 200, message: "success" });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ body: null, status: 500, message: "Failed to fetch user" });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  const { name, email, password } = await req.json();

  try {
    // Update user name if provided
    if (name) {
      try {
      await updateUserName(Number(id), name);
      }
      catch (e) {
        console.error("not good")
      }
    }

    // Update user email if provided
    if (email) {
      try{
      await updateUserEmail(Number(id), email);
      }
      catch (e) {
        console.error("not good")
      }
    }

    // Update user password if provided
    if (password) {
      const hashed = await hash(password, 12);
      try {
        await updateUserPassword(Number(id), hashed);
      }
      catch (e) {
        console.error("not good")
      }

    }

    return NextResponse.json({ body: null, status: 200, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ body: null, status: 500, message: 'Failed to update user' });
  }
}