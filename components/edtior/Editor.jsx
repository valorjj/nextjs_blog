/** @format */

import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const Editor = () => {
	const editorRef = useRef(ReactQuill);
	return (
		<ReactQuill
			theme={"bubble"}
			ref={editorRef}
		/>
	);
};

export default Editor;
