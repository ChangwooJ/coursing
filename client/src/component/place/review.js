import axios from "axios";
import React, { useEffect, useState } from "react";

const Review = ({place_id}) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sum, setSum] = useState(0);
    const [currentIndex, setCurrentIndex] = useState([]);

    useEffect(() => {
        const fetchPlaceData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/reviews/${place_id}`);
                setReviews(response.data);
                setCurrentIndex(Array(response.data.length).fill(0));
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (place_id) {
            fetchPlaceData();
        }
    }, [place_id]);

    useEffect(() => {
        const ratingAvg = () => {
            var sum = 0;
            reviews.map((rev) => {
                sum += rev.rating;
            });
            sum = sum / reviews.length;
            setSum(sum);
        }

        if(reviews) {
            ratingAvg();
        }
    }, [reviews])

    const handleNext = (review, revIndex) => {
        console.log(currentIndex[revIndex]);
        if (currentIndex[revIndex] === review.img.length - 3) {
            setCurrentIndex((prev) => {
                const newIndex = [...prev];
                newIndex[revIndex] += 0.5; 
                return newIndex;
            });
        }
        else if (currentIndex[revIndex] < review.img.length - 3) {
            setCurrentIndex((prev) => {
                const newIndex = [...prev];
                newIndex[revIndex] += 1; 
                return newIndex;
            });
        }
    };

    const handlePrev = (review, revIndex) => {
        if (currentIndex[revIndex] === review.img.length - 2.5) {
            setCurrentIndex((prev) => {
                const newIndex = [...prev];
                newIndex[revIndex] -= 0.5; 
                return newIndex;
            });
        }
        else if (currentIndex[revIndex] > 0) {
            setCurrentIndex((prev) => {
                const newIndex = [...prev];
                newIndex[revIndex] -= 1; 
                return newIndex;
            });
        }
    };

    return (
        <div className="place_review">
            <div className="rating">
                <p className="review_rating">⭐ {sum}</p>
                <p className="review_count">{reviews.length}개의 리뷰</p>
            </div>
            <div className="review_wrap">
                {reviews.slice(0, 3).map((review, revIndex) => (
                    <div className="review">
                        <div className="review_top">
                            <img src={review.profile_img} className="review_profile_img" />
                            <p>{review.name}</p>
                            <p className="personal_rating">⭐ {review.rating}</p>
                        </div>
                        <div className="review_body">
                            {review.img.length !== 0 && (

                                <div className="navigation">
                                    <button onClick={() => handlePrev(review, revIndex)} disabled={currentIndex[revIndex] === 0}>
                                        <img src="/img/scroll_left.png" className="scroll_bt" />
                                    </button>
                                    <button onClick={() => handleNext(review, revIndex)} disabled={currentIndex[revIndex] === review.img.length - 2.5}>
                                        <img src="/img/scroll_right.png" className="scroll_bt" />
                                    </button>
                                </div>
                            )}
                            <div className="review_img_wrap">
                                {review.img.map((img, index) => (
                                    <img
                                        src={img} className="review_img"
                                        style={{ transform: `translateX(-${currentIndex[revIndex] * 101}%)` }}
                                        key={index}
                                    />
                                ))}
                            </div>
                            <p className="review_commit">{review.comment}</p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Review;