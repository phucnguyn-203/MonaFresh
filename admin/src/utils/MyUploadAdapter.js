import axios from "axios";

export default class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      const data = new FormData();
      data.append("file", file);

      return axios
        .post("http://localhost:8080/api/v1/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const responseData = response.data;
          if (responseData && responseData.url) {
            return {
              default: responseData.url,
            };
          } else {
            throw new Error(`Couldn't upload file: ${file.name}.`);
          }
        });
    });
  }
}
