import { baseUrl } from "@/config/constants";

const getImageUrl = (src: string) => {
  return `${baseUrl}/${src}`;
};

export default getImageUrl;
