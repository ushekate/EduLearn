'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import pbstudent from '@/lib/db';

export default function TeacherRegister() {
    const router = useRouter();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        subject: [],
        phone_number: '',
        qualification: '',
        experience_years: '',
        bio: '',
        profile_pic: null,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files, multiple } = e.target;

        if (type === 'file') {
            setForm({ ...form, [name]: files[0] });
        } else if (multiple) {
            const selected = Array.from(e.target.selectedOptions, (option) => option.value);
            setForm({ ...form, [name]: selected });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const formData = new FormData();

        formData.append('email', form.email);
        formData.append('emailVisibility', true);
        formData.append('password', form.password);
        formData.append('passwordConfirm', form.confirmPassword);
        formData.append('first_name', form.first_name);
        formData.append('last_name', form.last_name);
        formData.append('phone_number', form.phone_number);
        formData.append('qualification', form.qualification);
        formData.append('experience_years', form.experience_years);
        formData.append('bio', form.bio);
        formData.append('role', 'teacher');

        form.subject.forEach((subj) => formData.append('subject[]', subj));

        if (form.profile_pic) {
            formData.append('profile_pic', form.profile_pic);
        }

        try {
            await pbstudent.collection('teachers').create(formData);
            setSuccess('Registration successful! Redirecting...');
            setTimeout(() => router.push('/teachers/signup/components/email-verify'), 1500);
        } catch (err) {
            setError(err.message || 'Registration failed.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen element flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Teachers Registration</h2>
                {error && 
                    <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                        {error}
                    </div>
                }
                {success && 
                    <div className="bg-green-100 text-green-600 p-2 mb-4 rounded">
                        {success}
                    </div>
                }

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={form.first_name}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={form.last_name}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="p-2 border rounded" />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="p-2 border rounded" />
                    </div>

                    <div className="w-full p-2 border rounded">
                        <p className="font-semibold mb-2">Select Subjects:</p>
                        <div className='grid grid-cols-4'>
                            {['Mathematics', 'English', 'Marathi', 'Hindi', 'History', 'Geography', 'Science', 'Computer'].map((subj) => (
                                <label key={subj} className="block">
                                    <input
                                        type="checkbox"
                                        name="subject"
                                        value={subj}
                                        checked={form.subject.includes(subj)}
                                        onChange={(e) => {
                                            const updatedSubjects = e.target.checked
                                                ? [...form.subject, subj]
                                                : form.subject.filter((s) => s !== subj);
                                            setForm({ ...form, subject: updatedSubjects });
                                        }}
                                        className="mr-2"
                                    />
                                    {subj}
                                </label>
                            ))}
                        </div>
                    </div>

                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="qualification"
                        placeholder="Qualification (e.g. B.Ed, M.Sc)"
                        value={form.qualification}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input type="number" name="experience_years" placeholder="Years of Experience" value={form.experience_years} onChange={handleChange} className="w-full p-2 border rounded" />

                    <textarea name="bio" placeholder="About You (Bio)" value={form.bio} onChange={handleChange} rows="4" className="w-full p-2 border rounded"></textarea>

                    <input type="file" name="profile_pic" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />

                    <button
                        type="submit"
                        // onClick={handleSubmit}
                        onClick={() => router.push('/teachers/signup/email-verify')}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Register as Teacher
                    </button>
                </form>
            </div>
        </div>
    );
}
