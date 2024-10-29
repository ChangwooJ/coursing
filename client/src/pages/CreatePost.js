import React, { useEffect, useState } from "react";
import TitleSelect from "../component/etc/titleSelect";
import NewPost from "../component/CreatePosts/newContent";

import "../css/CreatePost.css";
import PreviewPost from "../component/CreatePosts/previewPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserContents } from "../redux/actions/userContentActions";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
    const dispatch = useDispatch();
    const [ContentId, setContentId] = useState(0);
    const [view, setView] = useState(true);
    const [newCon, setNewCon] = useState(true);
    const [state, setState] = useState(false);  //기존/새 일정 구분
    const [contents, setContents] = useState([]);
    const [firstCon, setFirstCon] = useState(false);
    const [clickedContent, setClickedContent] = useState(null);
    const post_contents = useSelector(state => state.user_contents.user_contents);
    const navigate = useNavigate();

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
            const existingIndex = prevContents.findIndex(item => item.address === data.address);    //주소가 겹치는 경우
            let overlapTime = false;    //방문 시간대가 겹치는 경우
            const con = existingIndex !== -1 ? prevContents.filter((_, index) => index !== existingIndex) : prevContents;

            const newStart = new Date(data.start_time).getTime();
            const newEnd = new Date(data.end_time).getTime();

            con.forEach(prev => {
                const prevStart = new Date(prev.start_time).getTime();
                const prevEnd = new Date(prev.end_time).getTime();
                if (newStart < prevEnd && newEnd > prevStart) {
                    overlapTime = true;
                }
            });

            if(!overlapTime){
                const updatedContents = [...con, contentWithImage];
                setFirstCon(true);
                return updatedContents.sort((a, b) => a.start_time - b.start_time);
            } else {
                alert("시간이 겹치는 일정이 있습니다.");
                return prevContents;
            }
        });
    }

    const handleDeleteContent = (con) => {
        setContents(prevContents => prevContents.filter(item => item !== con));
    }

    const handleUploadPost = async (postId) => {
        try {
            const uploadPromises = contents.map(async (content) => {
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

                    await axios.post('http://localhost:8000/api/fin_upload', {
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
            })
            await Promise.all(uploadPromises);

            alert("업로드 하였습니다.");
            navigate(-1);
        } catch (error) {
            console.error('Error uploading post: ', error);
        }
    }

    const handleChangeInfo = (con) => {
        setClickedContent(con);
        setNewCon(true);
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
                    onhandleChangeInfo={handleChangeInfo}
                />
            )}
            {!view && newCon && (
                <NewPost setNewCon={setNewCon} onSaveContent={handleSaveContent} clickedContent={clickedContent}/>
            )}
        </React.Fragment>
    )
}

export default CreatePostPage;