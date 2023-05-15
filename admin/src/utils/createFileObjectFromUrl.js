import axios from "axios";

export default function createImageFileObjectFromUrl(url) {
  return axios.get(url, { responseType: "arraybuffer" }).then((response) => {
    const mimeType = response.headers["content-type"];
    const extension = mimeType.split("/")[1];
    const blob = new Blob([response.data], { type: mimeType });
    const timestamp = Date.now();
    const filename = `image_${timestamp}.${extension}`;
    return new File([blob], filename, { type: mimeType });
  });
}
