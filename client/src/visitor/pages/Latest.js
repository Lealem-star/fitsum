import React, { useEffect, useState } from 'react';
import api from '../../config/api';

const Latest = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await api.get('/api/latest-posts');
                const data = Array.isArray(res.data) ? res.data : [];
                const sorted = [...data].sort((a, b) => {
                    const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return bDate - aDate;
                });
                setPosts(sorted);
            } catch (err) {
                setError('Failed to load latest updates.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const renderMedia = (post) => {
        if (post.type === 'image' && post.mediaUrl) {
            return (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <img src={post.mediaUrl} alt={post.title} className="w-full h-64 object-cover" />
                </div>
            );
        }

        if (post.type === 'video' && post.mediaUrl) {
            return (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-black">
                    <video
                        src={post.mediaUrl}
                        controls
                        className="w-full h-64 object-cover"
                    />
                </div>
            );
        }

        if (post.type === 'youtube' && post.mediaUrl) {
            // Accept either a full YouTube URL or just the video ID
            const isFullUrl = post.mediaUrl.includes('youtube.com') || post.mediaUrl.includes('youtu.be');
            const videoId = isFullUrl
                ? post.mediaUrl
                    .replace(/.*v=/, '')
                    .replace(/.*be\//, '')
                    .split(/[?&]/)[0]
                : post.mediaUrl;
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            return (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-black">
                    <div className="relative w-full pb-[56.25%]">
                        <iframe
                            title={post.title || 'YouTube video'}
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            );
        }

        // text-only
        return null;
    };

    return (
        <div className="w-full">
            <section className="py-16 px-5 bg-transparent backdrop-blur-sm rounded-lg mx-4 mb-6">
                <div className="max-w-5xl mx-auto">
                    {loading && (
                        <div className="text-center text-amber-400 py-10">Loading latest updates...</div>
                    )}

                    {!loading && error && (
                        <div className="text-center text-amber-400 py-6">{error}</div>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <div className="text-center text-amber-400/80 py-10">No updates yet.</div>
                    )}

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post.id || post._id}
                                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm overflow-hidden"
                            >
                                {renderMedia(post)}
                                {(post.title || post.body) && (
                                    <div className="p-6 space-y-3">
                                        {post.title && (
                                            <h3 className="text-2xl font-semibold text-amber-400">{post.title}</h3>
                                        )}
                                        {post.body && <p className="text-amber-400/90 leading-relaxed">{post.body}</p>}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Latest;

