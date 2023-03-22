import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Photo from './Photo';

const PhotosModal = ({ show, photos, togglePhotos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState({ photo: null, idx: null });
    const [showPhoto, setShowPhoto] = useState(false);

    const toggleModal = (e) => {
        let truthValue = document.querySelector('.photos').contains(e);
        if (document.querySelector('.photo') === null) {
            togglePhotos(truthValue);
        }
        else if (document.querySelector('.photo').contains(e)) {
            return;
        }
    }

    const choosePhotoToView = (photo, idx) => {
        togglePhoto(false);
        setSelectedPhoto({ photo, idx });
    }

    const togglePhoto = (value) => {
        if (value) {
            return;
        }
        else {
            setShowPhoto(!showPhoto);
            document.querySelector('#photoModalRoot').classList.toggle('scale-0');
            document.querySelector('#photoModalRoot').classList.toggle('scale-1');
        }
    }

    const modal = show ? (
        <div className="photos-container flex w-full h-screen justify-center items-center relative bg-black/60" onClick={(e) => toggleModal(e.target)}>
            <div className="photos rounded-lg border-[#AA9BE6] border-2 w-[45%] h-[70%] xl:w-[70%] xl:h-[78%] mobile:w-[90%] mobile:h-[90%] bg-white relative">
                <button className="primary-btn absolute top-2 right-2 px-4" onClick={() => togglePhotos(false)}>
                    Close
                </button>

                <h1 className='text-center mt-10 mb-4 text-2xl'>Photo Gallery</h1>


                <div className='photo-list flex flex-wrap justify-center items-stretch gap-5 w-full p-2 max-h-[80%] mobile:px-2 mobile:max-h-[85%] overflow-scroll'>
                    {
                        photos.length > 0 ?
                            photos.map((photo, i) => {
                                return (
                                    <div key={i} className="group cursor-pointer transition-all relative w-[250px] border-4 border-[#AA9BE6] rounded-md object-contain" onClick={() => choosePhotoToView(photo, i)}>
                                        <img className='rounded-sm h-full' src={photo.image.url} alt={photo.image.description} />
                                        <p className='hidden group-hover:block transition-all h-5 group-hover:h-10 text-center absolute top-0 bg-black/50 text-sm z-50 w-full text-white'>{photo.accessibilityText}</p>
                                    </div>
                                )
                            })
                            : <div className="spinner"></div>
                    }
                </div>
                <Photo
                    photo={selectedPhoto.photo}
                    index={selectedPhoto.idx}
                    show={showPhoto}
                    togglePhoto={(e) => togglePhoto(e)}
                    shiftToPhoto={(idx) => setSelectedPhoto({ photo: photos[idx], idx })}
                    photosLength={photos.length - 1}
                />
            </div>
        </div>

    ) : null;


    return ReactDOM.createPortal(
        modal,
        document.querySelector('#modalRoot')
    )
}

export default PhotosModal