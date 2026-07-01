'use client';

import { useState, useEffect } from 'react';
import { getFeedPosts } from '@/lib/ruta';
import { PostCard } from './PostCard';
import type { FeedFilter } from '@/lib/ruta';
import type { RutaPost } from '@/types';

interface RutaFeedProps {
  filter:   FeedFilter;
  newPost?: RutaPost | null; // when QuestionComposer creates a new post
}

export function RutaFeed({ filter, newPost }: RutaFeedProps) {
  const [posts, setPosts] = useState<RutaPost[]>([]);

  useEffect(() => {
    setPosts(getFeedPosts(filter));
  }, [filter, newPost]);

  if (posts.length === 0) {
    const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
          No hay publicaciones en esta categoría aún.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
