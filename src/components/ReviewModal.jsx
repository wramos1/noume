import React from 'react';
import ReactDOM from 'react-dom';

const ReviewModal = ({ show, reviews, toggleReviews }) => {
    const toggleModal = (e) => {
        let truthValue = document.querySelector('.reviews').contains(e);
        toggleReviews(truthValue);
    }
    const modal = show ? (
        <div className="review-container flex w-full h-screen justify-center items-center relative bg-black/40" onClick={(e) => toggleModal(e.target)}>
            <div className="reviews w-3/5 max-h-3/5 bg-white xl:w-3/5 xl:h-4/5">
                <h1 className='text-center'>Reviews</h1>
                {
                    reviews.map((review) => {
                        return (
                            <div key={review.id} className="text-black">
                                {review.id}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    ) : null;

    return ReactDOM.createPortal(
        modal,
        document.querySelector('#modalRoot')
    )
}

export default ReviewModal