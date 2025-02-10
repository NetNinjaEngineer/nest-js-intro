export interface Tweet {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    likes: number;
    retweets: number;
    replies: number;
    hashtags: string[];
    mediaUrl?: string;
    isPinned: boolean;
    userId: number;
}
