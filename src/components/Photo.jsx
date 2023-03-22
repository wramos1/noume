import React from 'react';
import ReactDOM from 'react-dom';

const Photo = ({ photo, show, togglePhoto, index, shiftToPhoto, photosLength }) => {

    const toggleModal = (e) => {
        let truthValue = document.querySelector('.photo').contains(e);
        togglePhoto(truthValue);
    }

    const modal = show ? (
        <div className="photo-container flex w-full h-screen justify-center items-center relative bg-black/60" onClick={(e) => toggleModal(e.target)}>
            <button className="primary-btn absolute top-5 right-5 px-4 z-10 mobile:top-2 mobile:right-2">
                Close
            </button>

            <div className="photo relative w-3/5 h-[75%] xl:h-[90%] mobile:w-[90%] border-4 border-[#AA9BE6] rounded-md">
                <div className='absolute left-2 bottom-[50%] rounded-full'>
                    <button className='text-5xl primary-bg-color primary-txt-color cursor-pointer secondary-txt-color  disabled:cursor-not-allowed disabled:bg-black/50 disabled:text-white/50 rounded-full' disabled={index === 0} onClick={() => shiftToPhoto(index - 1)}>
                        &#x2190;
                    </button>
                </div>
                <div className='absolute right-2 bottom-[50%] rounded-full'>
                    <button className='text-5xl primary-bg-color primary-txt-color cursor-pointer secondary-txt-color  disabled:cursor-not-allowed disabled:bg-black/50 disabled:text-white/50 rounded-full' disabled={index === photosLength} onClick={() => shiftToPhoto(index + 1)}>
                        &#x2192;
                    </button>
                </div>
                <img className='rounded-sm h-full w-full' src={photo.image.url} alt={photo.image.description} />
                <p className='flex justify-center items-center text-xl mobile:text-sm transition-all h-10 text-center absolute top-0 bg-black/50 z-50 w-full text-white'>{photo.accessibilityText}</p>
            </div>
        </div>
    ) : null;




    return ReactDOM.createPortal(
        modal,
        document.querySelector('#photoModalRoot')
    )
}

export default Photo