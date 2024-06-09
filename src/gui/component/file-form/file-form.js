import React from "react";
function FileForm({onSubmit, file, ...props}) {

    return (
        <form onSubmit={onSubmit}>
            <input {...props} value={file} name="file" type="file" readOnly="true"></input>
            <button type="submit">Upload</button>
        </form>
    )

}
export default FileForm