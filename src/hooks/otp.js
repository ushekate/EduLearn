module.exports = {
  async beforeRequestVerification({ record, email }) {
    // Generate OTP (PocketBase handles this internally, but we can ensure it's stored)
    const otp = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);
    record.otp = parseInt(otp); // Store OTP in the record
    await record.save();
    // Return OTP for the email template
    return { otp };
  },
};


// module.exports = {
//   async beforeRequestVerification({ record, email }) {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);
//     record.otp = otp; // Store OTP in the record
//     await record.save();
//     return { otp }; // Pass OTP to email template
//   },
// };