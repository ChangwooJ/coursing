import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/actions/categoryActions";
import Review from "./review";

const Place = ({id, onClose}) => {
    const dispatch = useDispatch();
    const [placeData, setPlaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categories = useSelector(state =>  state.categories.categories);
    const [category, setCategory] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchCategory());
        }
        fetch();
    }, [dispatch]);

    useEffect(() => {
        const fetchPlaceData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/place/${id}`);
                setPlaceData(response.data);
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

    useEffect(() => {
        if (placeData && categories.length > 0) {
            const temp = categories.find(cate => cate.category_id === placeData.category_id);
            setCategory(temp || {});
        }
    }, [placeData, categories]);
    
    if (loading) return <div>Loading...</div>;

    return(
        <React.Fragment>
            <button onClick={onClose} className="close_place" >⇦</button>
            {error || !placeData && (<div>No place data found.</div>)}
            {!error && placeData && (
                <div className="place_wrap">
                    <div className="place_img">
                        <img src={placeData.img[0]} className="main_img" />
                        <div className="side_img_wrap">
                            {placeData.img.slice(1, 3).map((src, idx) => (
                                <img key={idx} src={src} className="side_img" />
                            ))}
                        </div>
                    </div>
                    <div className="place_title">
                        <h3 className="place_name">{placeData.place_name}</h3>
                        <p className="place_category">{category.category_name}</p>
                    </div>
                    <div className="place_info">
                        <p><img src="/img/주소.png" />{placeData.address}</p>
                        <p><img src="/img/영업시간.png" />{placeData.open}시 - {placeData.close}시</p>
                        <p><img src="/img/ph.png" />{placeData.ph}</p>
                    </div>
                    <Review place_id={placeData.place_id} />
                </div>
            )}
        </React.Fragment>
    )
}

export default Place;