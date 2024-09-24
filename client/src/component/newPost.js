import React, { useEffect, useRef, useState } from "react";
import Search from "./search";

const { kakao } = window;

const NewPost = ({ id, state }) => {
    const mapContainerRef = useRef(null);
    const [upload, setUpload] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [contentWrite, setContentWrite] = useState(false);
    const [searchPosition, setSearchPosition] = useState(null);
    const [mapWrite, setMapWrite] = useState(false);
    const [loc, setLoc] = useState([]);
    const [text, setText] = useState("");
    const [contentData, setContentData] = useState({
        content: null,
        img_src: null,
        address: null,
        cate_id: null,
        start_time: null,
        end_time: null,
        name: null
    });


    //console.log(option);
    useEffect(() => {
        if (mapContainerRef.current && searchPosition) {
            const option = {
                center: searchPosition,
                level: 4
            };

            const newMap = new kakao.maps.Map(mapContainerRef.current, option);

            const marker = new kakao.maps.Marker({
                position: searchPosition,
                clickable: true
            })

            marker.setMap(newMap);
        }
    }, [searchPosition]);

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

    const handleNext = () => {
        if (!mapWrite) {
            setMapWrite(true);
        } else {
            setContentWrite(true);
            setMapWrite(false);
        }
    }

    const handleImgSave = () => {

    }

    const handleContentSave = () => {

    }

    const handleReset = () => {
        setUpload(true);
        setPreview(null);
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="create_post_wrap">
            <div className="upload_img">
                {upload && (
                    <input type="file" accept="image/*" onChange={handleImg} />
                )}
                {preview && (
                    <div className="preview">
                        <img src={preview} style={{ width: "100px" }} />
                        {!mapWrite && (
                            <>
                            <button className="prev" onClick={() => handleReset()}><img src="/img/이전.png" /></button>
                            <button className="next" onClick={() => handleNext()}>다음</button>
                            </>
                        )}
                    </div>
                )}
                {mapWrite && (
                    <div className="map_write">
                        <Search setLoc={setLoc} setSearchPosition={setSearchPosition} />
                        {searchPosition && (
                            <>
                                <div className="map" ref={mapContainerRef} style={{ width: "450px", height: "400px" }}></div>
                                <button className="next" onClick={() => handleNext()}>다음</button>
                            </>
                        )}
                    </div>
                )}
                {contentWrite && (
                    <div className="content">
                        <input type="text" placeholder="장소명/메모" className="place" />
                        <select>
                            <option>카테고리</option>
                            <option>음식</option>
                            <option>관광/명소</option>
                            <option>문화/예술</option>
                            <option>쇼핑</option>
                            <option>엑티비티</option>
                            <option>휴양</option>
                            <option>이벤트/축제</option>
                        </select>
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            rows="10"
                            cols="50"
                            placeholder="여기에 컨텐츠를 입력하세요"
                        />
                        <p>시간: 
                            <input type="text" placeholder="00" className="start_time" /> -
                            <input type="text" placeholder="00" className="end_time" />
                        </p>
                        <div className="content_bt">
                            <button className="content_prev bt">이전</button>
                            <button className="content_next bt" onClick={() => handleContentSave()}>완료</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewPost;