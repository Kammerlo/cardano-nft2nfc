import axios from "axios";

export default class BlockfrostIPFSHelper {

    static async addFile(file: File) {

        const form = new FormData();
        form.append("file", file);
        form.append("title", file.name);

        const resp = await axios.post("localhost:5173/upload", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        return resp.data;
    }
}