export interface Image extends ImageUrl, ImageMetadata {}

export interface ImageMetadata {
  id: string;
  likes: number;
  dislikes: number;
}

export interface ImageUrl {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

export type VoteType = "like" | "dislike";
