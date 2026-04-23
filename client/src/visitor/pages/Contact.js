import React, { useState } from 'react';
import api from '../../config/api';
import portraitPrimary from '../../assets/invite1.png';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const combinedNotes = formData.phone
                ? `Phone: ${formData.phone}\n\n${formData.message || ''}`
                : formData.message;

            await api.post('/api/subscribers/subscribe', {
                name: formData.name,
                email: formData.email,
                source: 'partner',
                notes: combinedNotes,
            });
            setSuccess('Thanks for reaching out. I will be in touch soon.');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to submit. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-transparent">
            <section className="relative py-6 px-3 sm:py-8 sm:px-4 md:py-10 md:px-5 mx-auto max-w-6xl mb-4">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center text-amber-400 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm">
                    {/* Left: Image */}
                    <div className="flex justify-center md:justify-start order-1">
                        <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                            <img
                                src={portraitPrimary}
                                alt="Fitsum Fiseha"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Content & Form */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2">

                        {/* Niku Podcast Invitation */}
                        <div className="bg-amber-400/10 border-2 border-amber-400/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2">🎙️ Be a Guest on Niku Podcast</h3>
                            <p className="text-xs sm:text-sm md:text-base text-black/90 leading-relaxed">
                                Do you have an inspiring personal story to share? We're always looking for guests who want to share their journey, 
                                experiences, and insights on the Niku Podcast. If you're interested in being a guest and sharing your story, 
                                please let us know in your message below!
                            </p>
                        </div>

                        {success && (
                            <div className="bg-green-50/90 border border-green-200 text-green-800 px-4 py-3 rounded">
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50/90 border border-red-200 text-red-800 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-white/25 rounded-lg sm:rounded-xl bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-white/25 rounded-lg sm:rounded-xl bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-white/25 rounded-lg sm:rounded-xl bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-white/25 rounded-lg sm:rounded-xl bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none"
                                    placeholder="tell us about yourself and why you want to be a guest on the Niku Podcast"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-black font-semibold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300 disabled:opacity-60"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;

