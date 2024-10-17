import axios from "axios";
import React, { useEffect, useState } from "react";

const Place = ({id, onClose}) => {
    const [placeData, setPlaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaceData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/place/${id}`); // 적절한 API 엔드포인트로 수정
                setPlaceData(response.data);
                console.log(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPlaceData();
        }
    }, [id]);
console.log(placeData);
    if (loading) return <div>Loading...</div>;

    return(
        <React.Fragment>
            <button onClick={onClose} className="close_place" >⇦</button>
            {error || !placeData && (<div>No place data found.</div>)}
            {!error && placeData && (
                <>
                    <div className="place_img"><img src={placeData.img[0]} /></div>
                    <div className="review_img"></div>
                    <h4>{placeData.place_name}</h4>
                    <p>{placeData.address}</p>
                </>
            )}
        </React.Fragment>
    )
}

export default Place;