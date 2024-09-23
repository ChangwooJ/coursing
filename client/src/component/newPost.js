import React, { useState } from "react";

const NewPost = ({ id, state }) => {
    const [upload, setUpload] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImg = (e) => {
        const file = e.target.files[0];
        setUpload(false);
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        setUpload(true);
        setPreview(null);
    }

    return (
        <div className="create_post_wrap">
            <div className="upload_img">
                {upload && (
                    <input type="file" accept="image/*" onChange={handleImg} />
                )}
                {preview && (
                    <div className="preview">
                        <img src={preview} style={{ width: "100px" }} />
                        <button className="prev" onClick={() => handleReset()}><img src="/img/이전.png" /></button>
                        <button className="next">다음</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewPost;