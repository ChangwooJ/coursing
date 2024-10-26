import React, { useEffect, useRef, useState } from "react";
import Search from "../MyList/search";

const { kakao } = window;

const NewPost = ({ setNewCon, onSaveContent, clickedContent }) => {
    const mapContainerRef = useRef(null);
    const [upload, setUpload] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [contentWrite, setContentWrite] = useState(false);
    const [searchPosition, setSearchPosition] = useState(null);
    const [clickId, setClickId] = useState(0);
    const [mapWrite, setMapWrite] = useState(false);
    const [loc, setLoc] = useState([]);
    const [text, setText] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [category, setCategory] = useState(0);
    const [place, setPlace] = useState("");

    useEffect(() => {
        if (clickedContent) {
            setLoc({ address_name: clickedContent.address });
            setStartTime(clickedContent.start_time);
            setEndTime(clickedContent.end_time);
            setCategory(clickedContent.cate_id);
            setPlace(clickedContent.name);
        }
    }, [clickedContent]);

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
            if(clickedContent) {
                setContentWrite(true);
            } else setMapWrite(true);
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
            const newData = {
                _post_id: null,
                content: text,
                preview: preview,
                address: loc.address_name,
                cate_id: document.querySelector("select").selectedIndex,
                start_time: startTime,
                end_time: endTime,
                name: place,
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
                        <Search setResults={setLoc} setClickPosition={setSearchPosition} setClickId={setClickId} create={true} />
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
                        <input type="text" placeholder="장소명/메모" className="place" value={place} onChange={(e) => setPlace(e.target.value)}/>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value={0}>카테고리</option>
                            <option value={1}>음식</option>
                            <option value={2}>관광/명소</option>
                            <option value={3}>문화/예술</option>
                            <option value={4}>쇼핑</option>
                            <option value={5}>엑티비티</option>
                            <option value={6}>휴양</option>
                            <option value={7}>이벤트/축제</option>
                        </select>
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            rows="10"
                            cols="50"
                            placeholder="여기에 컨텐츠를 입력하세요"
                        />
                        <p>시간: 
                            <input type="text" placeholder="00" className="start_time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/> -
                            <input type="text" placeholder="00" className="end_time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
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