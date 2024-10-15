import React, { useState } from "react";

const { kakao } = window;

const Search = ({ setResults, setClickPosition }) => {
    const [text, setText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [pagination, setPagination] = useState(null);

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
                setSearchResults(data);
                setResults(data);
                setPagination(pagination);
            } else {
                alert('검색 결과가 없습니다.');
            }
        });
    }

    const handleResultClick = (place) => {
        setClickPosition(new kakao.maps.LatLng(place.y, place.x));
    }

    const handlePageChange = (pageNumber) => {
        if (pagination) {
            pagination.gotoPage(pageNumber);
        }
    };

    return (
        <React.Fragment>
            <form className="search_wrap" onSubmit={handleSearch}>
                <input 
                type="text" placeholder="장소 검색" 
                value={text} onChange={handleChange}
                />
                <button type="submit"><img src="img/검색.png"/></button>
            </form>
            <div className="search_results">
                <p className="search_title">"{text}"의 검색 결과</p>
                {searchResults.map((place, index) => (
                    <div
                        key={index}
                        className="search_result_item"
                        onClick={() => handleResultClick(place)}
                    >
                        <p>{place.place_name}</p>
                    </div>
                ))}
                {pagination && (
                    <div className="pagination_controls">
                        {Array.from({ length: pagination.last }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`pagination_bt ${pagination.current === i + 1 ? 'active' : ''}`}
                                disabled={pagination.current === i + 1}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default Search;

/*
address_name
: 
"전남 여수시 돌산읍 우두리 813-10"
category_group_code
: 
""
category_group_name
: 
""
category_name
: 
"여행 > 관광,명소"
distance
: 
""
id
: 
"27329260"
phone
: 
"1533-6256"
place_name
: 
"여수미남크루즈"
place_url
: 
"http://place.map.kakao.com/27329260"
road_address_name
: 
"전남 여수시 돌산읍 돌산로 3617-22"
x
: 
"127.73726157338305"
y
: 
"34.729442879404324"
*/