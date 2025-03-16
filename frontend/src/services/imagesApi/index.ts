import { ImageAPIService } from "../../types/api";
import { mockImagesApi } from "./mock/mockImagesApi";
import { imagesApi } from "./imagesApi";

const useMockImagesApi = import.meta.env.VITE_USE_MOCK_API === "true";

export const api: ImageAPIService = useMockImagesApi
  ? mockImagesApi
  : imagesApi;
