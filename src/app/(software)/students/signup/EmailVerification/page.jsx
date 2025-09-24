// 'use client';
// import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function EmailVerification() {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const handleChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value.slice(-1);
//     setOtp(newOtp);
//     if (e.target.value && index < 5) document.getElementsByName(`otp-${index + 1}`)[0].focus();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = parseInt(otp.join(''));
//     try {
//       const record = await pbstudent.collection('students').getFirstListItem(`email="${email}"`);
//       if (record.otp === otpCode) {
//         await pbstudent.collection('students').update(record.id, { verified: true, otp: null });
//         window.location.href = `/students/signup/DocumentUpload?email=${encodeURIComponent(email)}`;
//       } else {
//         alert('Invalid OTP. Please try again.');
//       }
//     } catch (err) {
//       console.log(err);
//       alert('Verification failed. Check console.');
//     }
//   };

//   return (
//     <div>
//       <h2>Enter OTP</h2>
//       <form onSubmit={handleSubmit}>
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             type="text"
//             name={`otp-${index}`}
//             value={digit}
//             onChange={(e) => handleChange(e, index)}
//             maxLength={1}
//             className="w-12 text-center"
//           />
//         ))}
//         <button type="submit">Verify</button>
//       </form>
//     </div>
//   );
// }












// 'use client';
// import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function EmailVerification() {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const handleChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value.slice(-1);
//     setOtp(newOtp);
//     if (e.target.value && index < 5) document.getElementsByName(`otp-${index + 1}`)[0].focus();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join('');
//     try {
//       await pbstudent.collection('students').authWithPassword(email, otpCode); // Verify OTP
//       // Redirect to document upload on success
//       window.location.href = `/students/signup/DocumentUpload?email=${encodeURIComponent(email)}`;
//     } catch (err) {
//       alert('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Enter OTP</h2>
//       <form onSubmit={handleSubmit}>
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             type="text"
//             name={`otp-${index}`}
//             value={digit}
//             onChange={(e) => handleChange(e, index)}
//             maxLength={1}
//             className="w-12 text-center"
//           />
//         ))}
//         <button type="submit">Verify</button>
//       </form>
//     </div>
//   );
// } 













// 'use client';
// import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function EmailVerification() {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const handleChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value.slice(-1);
//     setOtp(newOtp);
//     if (e.target.value && index < 5) document.getElementsByName(`otp-${index + 1}`)[0].focus();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join('');
//     try {
//       await pbstudent.collection('students').authWithPassword(email, otpCode); // Verify OTP
//       // Redirect to document upload on success
//       window.location.href = `/students/signup/DocumentUpload?email=${encodeURIComponent(email)}`;
//     } catch (err) {
//       alert('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Enter OTP</h2>
//       <form onSubmit={handleSubmit}>
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             type="text"
//             name={`otp-${index}`}
//             value={digit}
//             onChange={(e) => handleChange(e, index)}
//             maxLength={1}
//             className="w-12 text-center"
//           />
//         ))}
//         <button type="submit">Verify</button>
//       </form>
//     </div>
//   );
// }










// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import pbstudent from '@/lib/db';

// export default function EmailVerify() {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [error, setError] = useState('');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (index < 5 && value) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = '';
//       setOtp(newOtp);
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setError('Please enter a 6-digit OTP.');
//       return;
//     }
//     try {
//       await pbstudent.collection('students').confirmVerification(email, otpString);
//       alert('Email verified successfully!');
//       router.push('/students/signup/components/document-upload');
//     } catch (err) {
//       console.log(err);
//       setError('Invalid OTP. Please try again or request a new one.');
//     }
//   };

//   const handleResendOTP = async () => {
//     if (resendDisabled) return;
//     setResendDisabled(true);
//     try {
//       await pbstudent.collection('students').requestVerification(email);
//       alert('A new 6-digit OTP has been sent to your email.');
//     } catch (err) {
//       console.log(err);
//       alert('Failed to resend OTP. Check console for details.');
//     }
//     setTimeout(() => setResendDisabled(false), 60000); // Disable resend for 1 minute
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
//         <div className="w-full text-black shadow-2xl px-8 py-4">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">🔒</div>
//             <h2 className="text-xl font-bold ml-2">Verify Your Email</h2>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <p className="text-sm text-center">A 6-digit OTP has been sent to {email}. Please enter it below.</p>
//             <div className="flex justify-center gap-2">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-12 h-12 text-center border rounded text-black text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//               ))}
//             </div>
//             {error && <p className="text-red-600 text-sm text-center">{error}</p>}
//             <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
//               Verify OTP
//             </button>
//             <button
//               type="button"
//               onClick={handleResendOTP}
//               disabled={resendDisabled}
//               className="w-full mt-2 bg-gray-500 text-white py-1 rounded hover:bg-gray-600 transition disabled:bg-gray-300"
//             >
//               Resend OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }













// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import pbstudent from '@/lib/db';

// export default function EmailVerify() {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (index < 5 && value) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = '';
//       setOtp(newOtp);
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setError('Please enter a 6-digit OTP.');
//       return;
//     }
//     try {
//       await pbstudent.collection('students').confirmVerification(email, otpString);
//       alert('Email verified successfully!');
//       router.push('/students/signup/components/document-upload');
//     } catch (err) {
//       console.log(err);
//       setError('Invalid OTP. Please try again or request a new one.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
//         <div className="w-full text-black shadow-2xl px-8 py-4">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">🔒</div>
//             <h2 className="text-xl font-bold ml-2">Verify Your Email</h2>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <p className="text-sm text-center">A 6-digit OTP has been sent to {email}. Please enter it below.</p>
//             <div className="flex justify-center gap-2">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-12 h-12 text-center border rounded text-black text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//               ))}
//             </div>
//             {error && <p className="text-red-600 text-sm text-center">{error}</p>}
//             <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
//               Verify OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }













// 'use client';

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import pbstudent from '@/lib/db';

// export default function EmailVerify() {
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   // Note: Token-based verification requires the user to click the link from the email.
//   // For a manual flow, you can add a form to enter a token if provided separately.
//   const handleManualVerification = () => {
//     alert('Please check your email for the verification link and click it to verify your account.');
//     // Alternatively, implement a token input if you extract the token from the email link.
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
//         <div className="w-full text-black shadow-2xl px-8 py-4">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">🔒</div>
//             <h2 className="text-xl font-bold ml-2">Verify Your Email</h2>
//           </div>
//           <div className="space-y-4">
//             <p className="text-sm">A verification link has been sent to {email}. Please check your inbox and click the link to verify your email.</p>
//             {error && <p className="text-red-600 text-sm">{error}</p>}
//             <button
//               onClick={handleManualVerification}
//               className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition"
//             >
//               I Have Verified
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













// 'use client';

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import pbstudent from '@/lib/db';

// export default function EmailVerify() {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       await pbstudent.collection('students').confirmVerification(email, otp);
//       alert('Email verified successfully!');
//       router.push('/students/signup/components/document-upload');
//     } catch (err) {
//       console.log(err);
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
//         <div className="w-full text-black shadow-2xl px-8 py-4">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">🔒</div>
//             <h2 className="text-xl font-bold ml-2">Verify Your Email</h2>
//           </div>
//           <form onSubmit={handleVerify} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Enter OTP</label>
//               <input
//                 type="text"
//                 placeholder="Enter OTP sent to your email"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="text-black w-full border rounded px-3 py-1 mt-1"
//                 required
//               />
//             </div>
//             {error && <p className="text-red-600 text-sm">{error}</p>}
//             <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
//               Verify OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }