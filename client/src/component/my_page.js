import React, { useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions/postActions";
import { fetchUC } from "../redux/actions/user_categoryActions";
import { fetchContents } from "../redux/actions/postActions";
import "../css/my_page.css";

const My_Page = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    const user_category = useSelector(state => state.UC.UC);
    const { loading, userInfo } = useContext(AuthContext);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchContents());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && userInfo && userInfo[0]) {
            dispatch(fetchUC(userInfo[0].user_id));
        }
    }, [loading, userInfo, dispatch]);

    if (loading) {
        return <div>Loading...</div>; // 로딩 표시 변경 필요
    }

    const user_post = posts.filter(post => post.writer_id === userInfo[0].user_id);

    const handleProfileImg = () => {
        if (userInfo) {
            if (userInfo.profile_img == null) {
                return (
                    <div><img src="img/기본프로필.png" /></div>
                )
            }
            else return <div><img src={userInfo.profile_img} /></div>
        }
    };
    console.log(user_post);
    return (
        <React.Fragment>
            <div className="mypage_wrap">
                {userInfo && (
                    <>
                        <div className="info_wrap">
                            <div className="profile">
                                {handleProfileImg()}
                                <div className="my_info">
                                    <div className="info_name">{userInfo[0].name}</div>
                                    <div className="info_postnum">게시물 {user_post.length}</div>
                                    <div className="info_category">{user_category.map(uc => (
                                        <p>#{uc.category_name}</p>
                                    ))}</div>
                                    <div className="info_intro">{userInfo[0].intro}</div>
                                    <button>프로필 설정</button>
                                </div>
                            </div>
                        </div>
                        <div className="my_post">
                            {user_post.map(Upost => (
                                <div key={Upost.post_id} className="up_wrap">
                                    <p className="up_title">{Upost.title}</p>
                                    <div className="up_content">
                                        {contents
                                            .filter(content => content._post_id === Upost.post_id)
                                            .slice(0, 3)
                                            .map(con => (
                                                <div key={con.content_id}>
                                                    <img src={con.img_src} />
                                                </div>
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

export default My_Page;