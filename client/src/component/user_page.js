import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions/postActions";
import { fetchUsers } from "../redux/actions/userActions";
import { fetchUC } from "../redux/actions/user_categoryActions";
import { fetchContents } from "../redux/actions/postActions";
import { fetchPC } from "../redux/actions/post_categoryActions";
import { AuthContext } from "../context/AuthContext";
import "../css/user_page.css";

const User_Page = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    const user_category = useSelector(state => state.UC.UC);
    const post_category = useSelector(state => state.PC.PC);
    const [fetch, setFetch] = useState(false);
    const [myInfo, setMyInfo] = useState(false);
    const { loading, userInfo } = useContext(AuthContext);
    const user_post = posts.filter(post => post.writer_id === Number(user_id));
    const user_info = users.find(user => user.user_id === Number(user_id));

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchContents());
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUC(Number(user_id)));
        if(!loading && (userInfo[0].user_id === Number(user_id))){
            setMyInfo(true);
        }
    }, [user_id, loading]);


    useEffect(() => {
        if (!fetch) {
            dispatch(fetchPC());
            setFetch(true);
        }
    }, [dispatch, fetch]);

    const handlePost = (post_id) => {
        navigate(`/post/${post_id}`);
    }

    const handleNewPost = () => {
        navigate('/create_post');
    }

    if(loading){
        return <div>Loading...</div>;
    }

    //마이페이지의 경우 로그인 페이지로의 자동 이동 기능이 필요함
    /*if(!loading && userInfo){
        navigate('/');
    }*/
    
    return (
        <React.Fragment>
            <div className="page_wrap">
                {user_info && (
                    <>
                        <div className="info_wrap">
                            <div className="profile">
                                <div className="profile_img"><img src={user_info.profile_img} /></div>
                                <div className="user_info">
                                    <div className="info_name">{user_info.name}</div>
                                    <div className="info_postnum">게시물 {user_post.length}</div>
                                    <div className="info_category">{user_category.map(uc => (
                                        <p>#{uc.category_name}</p>
                                    ))}</div>
                                    <div className="info_intro">{user_info.intro}</div>
                                </div>
                                {myInfo && (
                                    <button className="setting_bt"><img src="/img/설정.png" /></button>
                                )}
                            </div>
                        </div>
                        <div className="user_post">
                            <button className="new_post_bt">
                                <img src="/img/글쓰기.png" onClick={() => handleNewPost()}/>
                            </button>
                            {user_post.map(Upost => (
                                <div key={Upost.post_id} className="up_wrap" onClick={() => handlePost(Upost.post_id)}>
                                    <p className="up_title">{Upost.title}</p>
                                    <div className="up_content">
                                        {contents
                                            .filter(content => content._post_id === Upost.post_id)
                                            .slice(0, 4)
                                            .map(con => (
                                                <img src={con.img_src} />
                                            ))}
                                    </div>
                                    <div className="up_category_wrap">
                                        {post_category
                                            .filter(pc => pc.post_id === Upost.post_id)
                                            .map(fpc => (
                                            <p className="up_category">#{fpc.category_name}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </React.Fragment>
    )
}

export default User_Page;