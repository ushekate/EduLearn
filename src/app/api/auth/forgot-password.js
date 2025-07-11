// app/api/auth/forgot-password.js
import PocketBase from 'pocketbase';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

    await pb.collection('students').requestPasswordReset(email);

    return Response.json({ message: 'Reset link sent to your email' }, { status: 200 });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return Response.json({ error: error?.message || 'Something went wrong' }, { status: 500 });
  }
}




















// // app/api/auth/forgot-password.js
// import PocketBase from 'pocketbase';

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return Response.json({ error: 'Email is required' }, { status: 400 });
//     }

//     const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

//     await pb.collection('students').requestPasswordReset(email);

//     return Response.json({ message: 'Reset link sent to your email' }, { status: 200 });
//   } catch (error) {
//     console.error('Forgot Password Error:', error);
//     return Response.json({ error: error?.message || 'Something went wrong' }, { status: 500 });
//   }
// }
