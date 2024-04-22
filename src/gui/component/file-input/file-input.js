import React from "react";
function FileInput({onSubmit, onChange, ...props}) {

    return (
        <form onSubmit={onSubmit}>
            <input {...props} name="file" type="file" onChange={onChange}></input>
            <button type="submit" >Upload</button>
        </form>
    )

}
export default FileInput