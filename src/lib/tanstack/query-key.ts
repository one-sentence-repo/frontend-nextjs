export const queryKey = {
  auth: {
    session: ['me', 'session'],
    info: ['me', 'info'],
  },

  user: {
    info: (userId: string) => ['user', 'info', userId],
  },

  post: {
    public: ['all_post'],
    liked: (userId?: string | null, meId?: string | null) => [
      'post',
      'liked',
      userId,
      meId,
    ],
    thatDay: (
      startOfDay?: string | null,
      endOfDay?: string | null,
      authorId?: string | null,
    ) => ['post', startOfDay, endOfDay, authorId],
    byPostType: (
      postType?: 'journal' | 'article',
      authorId?: string | null,
    ) => ['post', postType, authorId],
    detail: (postId?: number) => ['post', postId],
    checkLiked: (postId?: number, meId?: string | null) => [
      'post',
      'isLiked',
      postId,
      meId,
    ],

    count: {
      liked: (userId: string) => ['count', 'post', userId],
      total: (userId: string) => ['count', 'allPost', userId],
      byPostType: (userId: string, postType?: 'journal' | 'article') => [
        'count',
        'post',
        postType,
        userId,
      ],
    },
  },

  comment: {
    byPost: (postId: number) => ['comment', postId],
    byComment: (postId: number, commentId: number | null) => [
      'comment',
      postId,
      commentId,
    ],
    count: {
      byPost: (postId?: number) => ['count', 'comment', postId],
      byComment: (postId?: number, commentId?: number | null) => [
        'count',
        'comment',
        postId,
        commentId,
      ],
    },
  },

  word: {
    used: (authorId: string) => ['word', authorId],
    detail: (word: string) => ['word', word],
  },

  garden: (userId: string) => ['garden', userId],

  follow: {
    follower: (userId?: string) => ['follower', userId],
    following: (userId?: string) => ['following', userId],

    count: {
      follower: (userId?: string) => ['count', 'follower', userId],
      following: (userId?: string) => ['count', 'following', userId],
    },
  },

  todo: {
    inProgress: ['todo', 'in_progress'],
    completed: ['todo', 'completed'],
    main: ['todo_folder'],
    folder: (folderId: number) => ['todo', folderId],
    index: (folderId: number) => ['todo', 'index', folderId],
  },
}
