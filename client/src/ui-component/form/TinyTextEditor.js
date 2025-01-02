import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { imageUploadAPI } from 'api/upload';
import { FormLabel } from "@mui/material";
export const TinyTextEditor = (props) => {
    const editorRef = useRef(null);

    const handleUpload = async (blobInfo, success, failure) => {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append("folderName", props?.folderName);
            formData.append("file", blobInfo.blob(), blobInfo.filename());
            imageUploadAPI(formData).then(response => {
                resolve(response?.data?.data[0]?.url);
            })
                .catch(e => {
                    reject(e);
                });
        });
    };

    return (
        <>

            <FormLabel id={`form-radio-group-${props?.name}`} required={props?.required} style={{ display: 'flex', flexDirection: 'row', marginBottom: '7px' }}> {props?.label} </FormLabel>
            <Editor
                apiKey={process.env.REACT_APP_TINY_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={props?.content}
                name={props?.name}
                onChange={props?.onChange}
                plugins="advlist autolink lists link image charmap print preview anchor,searchreplace visualblocks code fullscreen,insertdatetime media table paste code wordcount image imagetools preview table"
                init={{
                    images_upload_handler: handleUpload,
                    height: 300,
                    menubar: true,
                    toolbar: `image | undo redo | formatselect | bold italic backcolor forecolor |
                alignleft aligncenter alignright alignjustify |
                bullist numlist outdent indent | removeformat | help | code | preview | table`,
                    image_caption: true,
                    branding: false
                }}
            />
        </>
    );
};