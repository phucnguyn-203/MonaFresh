import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapter from "../../../utils/MyUploadAdapter";
import "./styles.css";

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default function TextEditor({ data = "", handleChangeData }) {
  const editorConfig = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={editorConfig}
      onChange={(event, editor) => {
        handleChangeData(editor);
      }}
    />
  );
}
