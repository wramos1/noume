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
                    <button className='hover:ring-8 ring-[#AA9BE6]/80 focus:ring-8 focus:ring-[#AA9BE6]/40 focus:hover:ring-[#AA9BE6] focus:hover:ring-8 text-5xl border-[#AA9BE6] border-2 primary-txt-color bg-black/80 cursor-pointer  disabled:cursor-not-allowed disabled:bg-black/50 disabled:text-white/50 rounded-full' disabled={index === 0} onClick={() => shiftToPhoto(index - 1)}>
                        &#x2190;
                    </button>
                </div>
                <div className='absolute right-2 bottom-[50%] rounded-full'>
                    <button className='hover:ring-8 ring-[#AA9BE6]/80 focus:ring-8 focus:ring-[#AA9BE6]/40 focus:hover:ring-[#AA9BE6] focus:hover:ring-8 text-5xl border-[#AA9BE6] border-2 primary-txt-color bg-black/80 cursor-pointer  disabled:cursor-not-allowed disabled:bg-black/50 disabled:text-white/50 rounded-full' disabled={index === photosLength} onClick={() => shiftToPhoto(index + 1)}>
                        &#x2192;
                    </button>
                </div>
                <img className='rounded-sm h-full w-full' src={photo.image.url} alt={photo.image.description} />
                <p className='flex justify-center items-center text-xl mobile:text-sm transition-all text-center absolute top-0 bg-black/50 z-50 w-full text-white'>{photo.accessibilityText}</p>
            </div>
        </div>
    ) : null;




    return ReactDOM.createPortal(
        modal,
        document.querySelector('#photoModalRoot')
    )
}

export default Photo