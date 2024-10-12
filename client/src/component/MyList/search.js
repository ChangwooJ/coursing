import React, { useState } from "react";

const { kakao } = window;

const Search = ({ setLoc, setSearchPosition }) => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (!window.kakao) {
            alert("Kakao Maps API is not loaded");
            return;
        }

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(text, (data, status, pagination) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setLoc(data[0]);
                setSearchPosition(new kakao.maps.LatLng(data[0].y, data[0].x));
            } else {
                alert('검색 결과가 없습니다.');
            }
        });
    }

    return (
        <React.Fragment>
            <form className="search_wrap" onSubmit={handleSearch}>
                <input 
                type="text" placeholder="장소 검색" 
                value={text} onChange={handleChange}
                />
                <button type="submit"><img src="img/검색.png"/></button>
            </form>
        </React.Fragment>
    )
}

export default Search;