import { VoteType, Image, ImageMetadata } from "./image";

export interface ImageAPIService {
  getImages(): Promise<Image[]>;
  getImageMetadata(): Promise<ImageMetadata[]>;
  voteImage(imageId: string, voteType: VoteType): Promise<number>;
  exportVotes(): Promise<Blob>;
}
