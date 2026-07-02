import type { RutaPost, RutaComment, PostType, TripMemory } from '@/types';
import { MOCK_RUTA_POSTS, MOCK_RUTA_COMMENTS } from '@/lib/data';
import { authUtils } from '@/lib/auth';

const USER_POSTS_KEY    = 'mouto_ruta_posts';
const USER_COMMENTS_KEY = 'mouto_ruta_comments';
const REACTIONS_KEY     = 'mouto_ruta_reactions'; // string[]
const SHARED_KEY        = 'mouto_ruta_shared';    // string[] of shared memory IDs

// ── Destellos ──────────────────────────────────────────────────────────────

export function getDestelladoIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REACTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function hasReacted(postId: string): boolean {
  return getDestelladoIds().includes(postId);
}

export function toggleDestello(postId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ids = getDestelladoIds();
    const idx = ids.indexOf(postId);
    if (idx >= 0) {
      ids.splice(idx, 1);
      localStorage.setItem(REACTIONS_KEY, JSON.stringify(ids));
      return false;
    } else {
      ids.push(postId);
      localStorage.setItem(REACTIONS_KEY, JSON.stringify(ids));
      return true;
    }
  } catch { return false; }
}

// ── User posts (created in session) ────────────────────────────────────────

function getUserPosts(): RutaPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USER_POSTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveUserPost(post: RutaPost): void {
  if (typeof window === 'undefined') return;
  try {
    const posts = getUserPosts();
    posts.unshift(post);
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(posts));
  } catch { /* silent */ }
}

export function createQuestionPost(title: string, body: string): RutaPost {
  const user = authUtils.getUser();
  const post: RutaPost = {
    id:             `rp_u_${Date.now()}`,
    type:           'question',
    authorId:       user?.id ?? 'anon',
    authorName:     user?.name ?? 'Tú',
    authorAvatar:   user?.avatar ?? null,
    caravanaId:     null,
    createdAt:      new Date().toISOString(),
    title:          title.trim(),
    body:           body.trim(),
    imageUrl:       null,
    reactionsCount: 0,
    commentsCount:  0,
  };
  saveUserPost(post);
  return post;
}

export function shareMemoryToRuta(memory: TripMemory): RutaPost {
  const user = authUtils.getUser();
  const post: RutaPost = {
    id:             `rp_mem_${Date.now()}`,
    type:           'memory_share',
    authorId:       user?.id ?? 'anon',
    authorName:     user?.name ?? 'Tú',
    authorAvatar:   user?.avatar ?? null,
    caravanaId:     null,
    createdAt:      new Date().toISOString(),
    title:          memory.caption || 'Recuerdo compartido',
    body:           memory.location ? `📍 ${memory.location}` : '',
    imageUrl:       memory.photo,
    linkedCarId:    memory.ownedCarId,
    reactionsCount: 0,
    commentsCount:  0,
  };
  saveUserPost(post);
  markMemoryShared(memory.id);
  return post;
}

// ── Shared memory tracking ─────────────────────────────────────────────────

export function hasSharedMemory(memoryId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(SHARED_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return ids.includes(memoryId);
  } catch { return false; }
}

export function markMemoryShared(memoryId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(SHARED_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    if (!ids.includes(memoryId)) {
      ids.push(memoryId);
      localStorage.setItem(SHARED_KEY, JSON.stringify(ids));
    }
  } catch { /* silent */ }
}

// ── Comments ───────────────────────────────────────────────────────────────

function getUserComments(): RutaComment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USER_COMMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function getComments(postId: string): RutaComment[] {
  const mock = MOCK_RUTA_COMMENTS.filter((c) => c.postId === postId);
  const user = getUserComments().filter((c) => c.postId === postId);
  return [...mock, ...user].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

export function addComment(postId: string, body: string): RutaComment {
  const user   = authUtils.getUser();
  const comment: RutaComment = {
    id:         `rc_u_${Date.now()}`,
    postId,
    authorName: user?.name ?? 'Tú',
    body:       body.trim(),
    createdAt:  new Date().toISOString(),
  };
  try {
    const all = getUserComments();
    all.push(comment);
    localStorage.setItem(USER_COMMENTS_KEY, JSON.stringify(all));
  } catch { /* silent */ }
  return comment;
}

// ── Feed ───────────────────────────────────────────────────────────────────

type FeedFilter = PostType | 'todo' | 'preguntas' | 'marketplace' | 'novedades' | 'comunidad';

const NOVEDADES: PostType[] = ['announcement', 'launch', 'industry_news', 'brand_news'];
const COMUNIDAD: PostType[] = ['memory_share', 'atelier_share'];

export function getFeedPosts(filter: FeedFilter = 'todo'): RutaPost[] {
  const all = [...MOCK_RUTA_POSTS, ...getUserPosts()];

  let filtered: RutaPost[];
  switch (filter) {
    case 'todo':        filtered = all; break;
    case 'preguntas':   filtered = all.filter((p) => p.type === 'question'); break;
    case 'marketplace': filtered = all.filter((p) => p.type === 'marketplace'); break;
    case 'novedades':   filtered = all.filter((p) => NOVEDADES.includes(p.type)); break;
    case 'comunidad':   filtered = all.filter((p) => COMUNIDAD.includes(p.type)); break;
    default:            filtered = all.filter((p) => p.type === filter); break;
  }

  // Pinned first, then by date desc
  return filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export type { FeedFilter };
