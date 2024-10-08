import React, { useEffect, useState } from "react";
import TitleSelect from "../component/etc/titleSelect";
import NewPost from "../component/CreatePosts/newContent";

import "../css/CreatePost.css";
import PreviewPost from "../component/CreatePosts/previewPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserContents } from "../redux/actions/userContentActions";

const CreatePostPage = () => {
    const dispatch = useDispatch();
    const [ContentId, setContentId] = useState(1);
    const [view, setView] = useState(true);
    const [newCon, setNewCon] = useState(true);
    const [state, setState] = useState(false);  //기존/새 일정 구분
    const [contents, setContents] = useState([]);
    const [firstCon, setFirstCon] = useState(false);
    const post_contents = useSelector(state => state.user_contents.user_contents);

    console.log(post_contents);
    useEffect(() => {
        const fetch = () => {
            dispatch(fetchUserContents());
        };
        fetch();
    }, [dispatch])

    useEffect(() => {
        const filteredContents = post_contents.filter(c => c.content_id === ContentId);
        setContents(filteredContents);
    }, [post_contents, ContentId]);

    const handleNewPost = (state) => {
        setView(false);
        setState(state);
        if(state) {
            setFirstCon(true);
            setNewCon(false);
        }
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

    const handleDeleteContent = (con) => {
        setContents(prevContents => prevContents.filter(item => item !== con));
    }

    const handleUploadPost = async (postId) => {
        console.log("Received postId in CreatePostPage:", contents);
        try {
            for (const content of contents) {
                if (content.image) {
                    const formData = new FormData();
                    formData.append('image', content.image); // 폼에 이미지 파일 추가
    
                    const response = await axios.post('http://localhost:8000/api/upload_image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    
                    content._post_id = postId;
                    content.img_src = response.data.img_src;
                    content.cate_id += 1;

                    const fin_upload = await axios.post('http://localhost:8000/api/fin_upload', {
                        _post_id: content._post_id,
                        content: content.content,
                        img_src: content.img_src,
                        address: content.address,
                        cate_id: content.cate_id,
                        start_time: content.start_time,
                        end_time: content.end_time,
                        name: content.name
                    });
                }
            }
        } catch (error) {
            console.error('Error uploading post: ', error);
        }
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
                <PreviewPost 
                    content={contents} 
                    setNewCon={setNewCon} 
                    onDeleteContent={handleDeleteContent} 
                    onUploadPost={handleUploadPost}
                />
            )}
            {!view && newCon && (
                <NewPost setNewCon={setNewCon} onSaveContent={handleSaveContent}/>
            )}
        </React.Fragment>
    )
}

export default CreatePostPage;