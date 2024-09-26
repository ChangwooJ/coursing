import React, { useEffect, useState } from "react";
import TitleSelect from "../component/etc/titleSelect";
import NewPost from "../component/CreatePosts/newContent";

import "../css/CreatePost.css";
import PreviewPost from "../component/CreatePosts/previewPost";

const CreatePostPage = () => {
    const [ContentId, setContentId] = useState(1);
    const [view, setView] = useState(true);
    const [newCon, setNewCon] = useState(true);
    const [state, setState] = useState(false);
    const [contents, setContents] = useState([]);
    const [firstCon, setFirstCon] = useState(false);

    /*
    useEffect(()=>{
        console.log("contents: ", contents);
    }, [contents])
    */

    const handleNewPost = (state) => {
        setView(false);
        setState(state);
    }

    const handleSaveContent = (data, image) => {
        const contentWithImage = {
            ...data,
            image
        };
        setContents(prevContents => {
            const updatedContents = [...prevContents, contentWithImage];
            return updatedContents.sort((a, b) => a.start_time - b.start_time);
        });
        setFirstCon(true);
    }

    return (
        <React.Fragment>
            {view && (
                <div className="create_post_root">
                    <div className="create_post myplan">
                        <h3>내 일정으로 만들기</h3>
                        <p>"기존의 내 일정을 선택해서 새로운 글을 작성할 수 있습니다."</p>
                        <TitleSelect setContentId={setContentId} />
                        <button className="myplan_bt create_post_bt" onClick={() => handleNewPost(true)}>다음</button>
                    </div>
                    <div className="create_post newplan">
                        <h3>새 일정으로 만들기</h3>
                        <p>"새로운 일정을 생성하여 새로운 글을 작성할 수 있습니다."</p>
                        <button className="newplan_bt create_post_bt" onClick={() => handleNewPost(false)}>다음</button>
                    </div>
                </div>
            )}
            {!view && firstCon && (
                <PreviewPost content={contents} />
            )}
            {!view && newCon && (
                <NewPost id={ContentId} setNewCon={setNewCon} onSaveContent={handleSaveContent}/>
            )}
        </React.Fragment>
    )
}

export default CreatePostPage;