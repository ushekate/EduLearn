'use client';

import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
      <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">

        {/* Left Form Section */}
        <div className="w-full text-black shadow-2xl px-8 py-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
              🎓
            </div>
            <h2 className="text-xl font-bold ml-2">Sign-Up Form</h2>
          </div>

          <form className="space-y-2 text-black">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input type="text" placeholder="Enter your first name" className="text-black w-full border rounded px-3 py-1 mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input type="text" placeholder="Enter your last name" className="text-black w-full border rounded px-3 py-1 mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" placeholder="Enter your email address" className="text-black w-full border rounded px-3 py-1 mt-1" />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Password</label>
              <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="text-black w-full border rounded px-3 py-1 mt-1" />
              <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" className="text-black w-full border rounded px-3 py-1 mt-1" />
              <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Student Level</label>
              <div className="relative">
                <select className="appearance-none text-black w-full border rounded px-3 py-1 mt-1 pr-10">
                  <option value="">Select Option</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center">
                  <ChevronDown size={20} className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" className="text-black mr-2" />
              <span>
                I agree to the <a href="#" className="text-purple-600 underline">Terms and Conditions</a>
              </span>
            </div>

            <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
              Sign Up
            </button>

            <p className="text-sm text-center mt-2">
              Already have an account? <a href="/students/login" className="text-purple-600 underline">Log In</a>
            </p>
          </form>
        </div>
      </div>


      {/* Right Welcome Section */}
      <div className="hidden  md:flex flex-col justify-center items-center w-1/2 bg-trasparent text-white px-4 pt-4">
        <div className='px-4'>
          <h2 className="text-6xl font-bold mb-2">Welcome to</h2>
          <h3 className="text-6xl font-medium mb-2">student portal</h3>
          <p className="text-sm">Login to access your account</p>
        </div>

        {/* Placeholder illustration */}
        <div className='flex justify-center items-center'>
          <img src="/edulearnImage.png" alt="Student" className="w-[80%] h-[80%]" />
        </div>
      </div>

    </div>
  );
}



















// 'use client';

// import React, { useState } from 'react';
// import { ChevronDown, Eye, EyeOff } from 'lucide-react';

// export default function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">

//         {/* Left Form Section */}
//         <div className="w-full text-black shadow-2xl p-8">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
//               🎓
//             </div>
//             <h2 className="text-xl font-bold ml-2">Sign-Up Form</h2>
//           </div>

//           <form className="space-y-4 text-black">
//             <div>
//               <label className="block text-sm font-medium">First Name</label>
//               <input type="text" placeholder="Enter your first name" className="text-black w-full border rounded px-3 py-2 mt-1" />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Last Name</label>
//               <input type="text" placeholder="Enter your last name" className="text-black w-full border rounded px-3 py-2 mt-1" />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Email</label>
//               <input type="email" placeholder="Enter your email address" className="text-black w-full border rounded px-3 py-2 mt-1" />
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium">Password</label>
//               <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="text-black w-full border rounded px-3 py-2 mt-1" />
//               <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </div>
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium">Confirm Password</label>
//               <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" className="text-black w-full border rounded px-3 py-2 mt-1" />
//               <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
//                 {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Student Level</label>
//               <div className="relative">
//                 <select className="appearance-none text-black w-full border rounded px-3 py-2 mt-1 pr-10">
//                   <option value="">Select Option</option>
//                   <option value="5th">5th</option>
//                   <option value="6th">6th</option>
//                   <option value="7th">7th</option>
//                   <option value="8th">8th</option>
//                   <option value="9th">9th</option>
//                   <option value="10th">10th</option>
//                   <option value="11th">11th</option>
//                   <option value="12th">12th</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center">
//                   <ChevronDown size={20} className="w-4 h-4 text-black" />
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center text-sm">
//               <input type="checkbox" className="text-black mr-2" />
//               <span>
//                 I agree to the <a href="#" className="text-purple-600 underline">Terms and Conditions</a>
//               </span>
//             </div>

//             <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition">
//               Sign Up
//             </button>

//             <p className="text-sm text-center mt-2">
//               Already have an account? <a href="/students/login" className="text-purple-600 underline">Log In</a>
//             </p>
//           </form>
//         </div>
//       </div>


//       {/* Right Welcome Section */}
//       <div className="hidden  md:flex flex-col justify-center items-center w-1/2 bg-trasparent text-white px-4 pt-4">
//         <div className='p-4'>
//           <h2 className="text-6xl font-bold mb-2">Welcome to</h2>
//           <h3 className="text-6xl font-medium mb-2">student portal</h3>
//           <p className="text-sm">Login to access your account</p>
//         </div>

//         {/* Placeholder illustration */}
//         <div className='flex justify-center items-center'>
//           <img src="/edulearnImage.png" alt="Student" className="w-[80%] h-[80%]" />
//         </div>
//       </div>

//     </div>
//   );
// }
