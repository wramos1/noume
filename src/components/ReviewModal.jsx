import React from 'react';
import ReactDOM from 'react-dom';

const ReviewModal = ({ show, reviews, toggleReviews }) => {
    const toggleModal = (e) => {
        let truthValue = document.querySelector('.reviews').contains(e);
        toggleReviews(truthValue);
    }
    const modal = show ? (
        <div className="review-container flex w-full h-screen justify-center items-center relative bg-black/60" onClick={(e) => toggleModal(e.target)}>
            <div className="reviews rounded-lg border-[#AA9BE6] border-2 w-[45%] h-[70%] xl:w-[55%] xl:h-[75%] mobile:w-[90%] mobile:h-[90%] bg-white relative">
                <button className='primary-btn absolute top-2 right-2 px-4' onClick={() => toggleReviews(false)}>
                    Close
                </button>
                <h1 className='text-center my-4 text-2xl'>Reviews</h1>

                <div className="review-list flex flex-col gap-10 w-full p-2 px-10 max-h-[80%] mobile:px-2 mobile:max-h-[90%] overflow-scroll">
                    {
                        reviews.length > 0 ?
                            reviews.map((review) => {
                                return (
                                    <div key={review.id} className="text-black flex w-full gap-5">
                                        <div className='h-4/5 flex items-center'>
                                            <svg className="user-icon h-full bg-black rounded-xl" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M45.8333 48.125V43.5417C45.8333 41.1105 44.8676 38.7789 43.1485 37.0599C41.4294 35.3408 39.0978 34.375 36.6667 34.375H18.3333C15.9022 34.375 13.5706 35.3408 11.8515 37.0599C10.1324 38.7789 9.16666 41.1105 9.16666 43.5417V48.125" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M27.5 25.2083C32.5626 25.2083 36.6667 21.1043 36.6667 16.0417C36.6667 10.9791 32.5626 6.875 27.5 6.875C22.4374 6.875 18.3333 10.9791 18.3333 16.0417C18.3333 21.1043 22.4374 25.2083 27.5 25.2083Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                        <div>
                                            <h1 className="user-name text-xl font-bold">
                                                {review.stayDuration} <span className='text-sm text-black/50'>{review.submissionTimeLocalized}</span>
                                            </h1>
                                            <h2 className="user-rating italic">
                                                Rating: {review.reviewScoreWithDescription.value}
                                            </h2>
                                            <p className="user-comment pt-2 pl-1">
                                                "{review.text}"
                                            </p>
                                        </div>
                                    </div>
                                )
                            }) : <div className="spinner"></div>
                    }
                </div>
            </div>
        </div>
    ) : null;

    return ReactDOM.createPortal(
        modal,
        document.querySelector('#modalRoot')
    )
}

export default ReviewModal