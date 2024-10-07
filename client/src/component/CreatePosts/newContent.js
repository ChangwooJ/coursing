import React, { useEffect, useRef, useState } from "react";
import Search from "../MyList/search";

const { kakao } = window;

const NewPost = ({ setNewCon, onSaveContent }) => {
    const mapContainerRef = useRef(null);
    const [upload, setUpload] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [contentWrite, setContentWrite] = useState(false);
    const [searchPosition, setSearchPosition] = useState(null);
    const [mapWrite, setMapWrite] = useState(false);
    const [loc, setLoc] = useState([]);
    const [text, setText] = useState("");

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

    //입력된 이미지를 사용 가능한 상태로 인코딩.
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

    //다음 버튼
    const handleNext = () => {
        if (!mapWrite) {
            setMapWrite(true);
        } else {
            setContentWrite(true);
            setMapWrite(false);
        }
    }

    //컨텐츠 업로드
    const handleContentSave = (prev) => {
        if(prev){
            setContentWrite(false);
            setMapWrite(true);
            setSearchPosition(false);
            setText("");
        }
        else if(!prev){
            const temp_start = document.querySelector(".start_time").value;
            const temp_end = document.querySelector(".end_time").value;
            const newData = {
                _post_id: null,
                content: text,
                preview: preview,
                address: loc.address_name,
                cate_id: document.querySelector("select").selectedIndex,
                start_time: temp_start,
                end_time: temp_end,
                name: document.querySelector(".place").value,
                img_src: preview,
            };
    
            onSaveContent(newData, image);
            setNewCon(false);

        }
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
                    <input type="file" accept="image/*" className="upload_img_input" onChange={handleImg} />
                )}
                {preview && (
                    <div className="preview">
                        <img src={preview} style={{ width: "230px" }} />
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
                                <button className="next" onClick={() => handleNext()}>next</button>
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
                            <button className="content_prev bt" onClick={() => handleContentSave(true)}>이전</button>
                            <button className="content_next bt" onClick={() => handleContentSave()}>완료</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewPost;