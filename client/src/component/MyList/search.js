import React, { useEffect, useState } from "react";
import Place from "./place";

const { kakao } = window;

const Search = ({ setResults, setClickPosition, setClickId }) => {
    const [text, setText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searched, setSearched] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        if(text === ""){
            setSearched(false);
        }
    }, [text]);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearched(true);

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
        setClickId(place.id);
        setClickPosition(new kakao.maps.LatLng(place.y, place.x));
        setId(place.id);
    }

    const handlePageChange = (pageNumber) => {
        if (pagination) {
            pagination.gotoPage(pageNumber);
        }
    };

    const closePlace = () => {
        setId(0);
    }

    return (
        <React.Fragment>
            <form className="search_wrap" onSubmit={handleSearch}>
                <input
                    type="text" placeholder="장소 검색"
                    value={text} onChange={handleChange}
                />
                <button 
                    type="button" className="delete_text" 
                    onClick={() => {setSearched(false); setText("")}}
                ><img src="img/초기화.png" /></button>
                <button type="submit"><img src="img/검색.png" /></button>
            </form>
            {searched && (
                <div className="search_results">
                    {!id && (
                        <>
                            <p className="search_title">"{text}" 의 검색 결과</p>
                            <div className="search_lists">
                                {searchResults.map((place, index) => (
                                    <div
                                        key={index}
                                        className="search_result_item"
                                        onClick={() => handleResultClick(place)}
                                    >
                                        {console.log(place.id)}
                                        <p>{place.place_name}</p>
                                    </div>
                                ))}
                            </div>
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
                        </>
                    )}
                    {id && (<Place id={id} onClose={closePlace} />)}
                </div>
            )}
        </React.Fragment>
    )
}

export default Search;