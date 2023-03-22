import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { QueriesContext } from '../data/QueriesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as BasicHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import PhotosModal from './PhotosModal';
import ReviewModal from './ReviewModal';

const Noume = () => {
    const { id } = useParams();
    const [noume, setNoume] = useState(null);
    const { selectedNoume, savedNoumes, setSavedNoumes } = useContext(QueriesContext);
    const [loading, setLoading] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [saved, setSaved] = useState(false);

    const checkIfSaved = () => {
        if (savedNoumes) {
            if (savedNoumes.some((savedNoume) => savedNoume.id === id)) {
                setSaved(true);
            }
        }
    };

    const save = () => {
        if (savedNoumes.length === 10) {
            alert('Cannot save more than 10 Noumes');
            return;
        }
        else {
            if (saved) {
                setSaved(false);
                setSavedNoumes(savedNoumes.filter((savedNoume) => savedNoume.id !== id));
                window.localStorage.setItem('myNoumes', JSON.stringify(savedNoumes));
            }
            else {
                setSaved(true)
                setSavedNoumes([...savedNoumes, selectedNoume]);
                window.localStorage.setItem('myNoumes', JSON.stringify(savedNoumes));
            }
        }
    }

    const navigate = useNavigate();

    const params = JSON.stringify({ propertyId: id })

    const findNoume = async () => {
        try {
            const result = await fetch('https://hotels4.p.rapidapi.com/properties/v2/detail', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'ae9171a8fbmsh26e3b73616d4dc1p1e51f1jsnd4121cd446e0',
                    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
                },
                body: params
            });

            const data = await result.json();
            setNoume(data.data.propertyInfo);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setLoading(true);
        findNoume();
        checkIfSaved()
    }, [])

    const makeStars = () => {
        let iconArr = [];
        for (let i = 0; i < noume.summary.overview.propertyRating.rating; i++) {
            iconArr.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" fill="rgba(170,155,230,1)" /></svg>);
        }
        return iconArr;
    }

    const fetchReviews = async () => {
        toggleReviews(false);
        if (reviews.length > 0) {
            console.log('already here')
            return;
        }
        else {
            let fetchParams = {
                propertyId: id,
                size: 10,
                startingIndex: 0
            };

            const results = await fetch('https://hotels4.p.rapidapi.com/reviews/v3/list', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'ae9171a8fbmsh26e3b73616d4dc1p1e51f1jsnd4121cd446e0',
                    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
                },
                body: `${JSON.stringify(fetchParams)}`
            });

            const data = await results.json();

            setReviews(data.data.propertyInfo.reviewInfo.reviews)
        }
    };

    const fetchPhotos = () => {
        togglePhotos(false);
        if (photos.length > 0) {
            return;
        }
        else {
            setPhotos(noume.propertyGallery.images);
        }
    }

    const toggleReviews = (value) => {
        if (value) {
            return;
        }
        else {
            setShowReviews(!showReviews);
            document.body.classList.toggle('overflow-hidden');
            document.querySelector('.nav').classList.toggle('absolute');
            document.querySelector('#modalRoot').classList.toggle('scale-0');
            document.querySelector('#modalRoot').classList.toggle('scale-1');
        }
    };

    const togglePhotos = (value) => {
        if (value) {
            return;
        }
        else {
            setShowPhotos(!showPhotos);
            document.body.classList.toggle('overflow-hidden');
            document.querySelector('.nav').classList.toggle('absolute');
            document.querySelector('#modalRoot').classList.toggle('scale-0');
            document.querySelector('#modalRoot').classList.toggle('scale-1');
        }
    }


    {
        return (
            !noume ?
                <div className="spinner"></div>
                :
                <>
                    <Navbar classProps={'bg-[#7468AD] text-white p-5'} />
                    <div className='pt-28 flex flex-col gap-12'>
                        <div className='flex relative px-4 mobile:flex-col mobile:px-0'>
                            <div className='w-full flex flex-col relative'>
                                <div
                                    className='absolute right-6 top-5 text-4xl cursor-pointer'
                                    onClick={() => save()}
                                >
                                    {saved ? <FontAwesomeIcon icon={SolidHeart} style={{ color: 'red' }} /> : <FontAwesomeIcon icon={BasicHeart} style={{ color: 'red' }} />}
                                </div>
                                <img
                                    className='w-full mobile:w-3/5 mobile:self-center h-full self-end border-4 border-[#AA9BE6]'
                                    src={noume.propertyGallery.images[0].image.url}
                                    alt="property" />
                                <p className='pt-2 decoration-[#AA9BE6] underline mobile:text-center hover:decoration-[3px] hover:cursor-pointer' onClick={fetchPhotos}>View More Photos <span className='primary-bg-color p-1 rounded-[50%] text-white'>{noume.propertyGallery.thumbnailGalleryDialog.trigger.value}</span></p>
                            </div>

                            <div className='w-full flex flex-col justify-between mobile:py-5'>
                                <div className='w-full'>
                                    <div className='w-full inline-flex items-center'>
                                        <h1 className='noume-title w-[35%] mobile:w-[30%]'></h1>
                                        <h1 className='items-center flex 2xl:text-5xl xl:text-3xl text-2xl w-full text-center justify-center'>
                                            {noume.summary.name}
                                        </h1>
                                        <span className='inline-flex gap-10 text-sm justify-center w-[30%] mobile:w-[28%]'>{makeStars()}</span>
                                    </div>
                                    <p className='w-full text-center my-2 xl:text-sm 2xl:text-lg'>
                                        {noume.summary.location.address.addressLine}
                                    </p>
                                    <p className='w-full text-center xl:text-sm 2xl:text-lg text-gray-500/90'>
                                        {noume.summary.tagline}
                                    </p>
                                </div>



                                <div className='flex justify-between my-5 gap-2'>
                                    <div className='w-full flex flex-col items-center'>
                                        <h2 className='font-black xl:text-[1.5rem] 2xl:text-[2rem] mb-2'>Top Amenities</h2>
                                        <ul className='xl:text-[0.8rem] text-xs w-3/5 text-left gap-[5px] list-disc flex flex-col max-h-[150px] overflow-y-scroll list-inside'>
                                            {noume.summary.amenities.topAmenities.items !== null ?
                                                noume.summary.amenities.topAmenities.items.map((amenity, i) => {
                                                    return (
                                                        <li key={i} className=''>{amenity.text}</li>
                                                    )
                                                }) : <li>None Found</li>}
                                        </ul>
                                    </div>

                                    <div className='w-full flex flex-col items-center'>
                                        <h2 className='font-black xl:text-[1.5rem] 2xl:text-[2rem] mb-2'>Things to Note</h2>
                                        <ul className='xl:text-[0.8rem] text-left text-sm gap-[5px] flex flex-col max-h-[150px] overflow-y-scroll'>
                                            {noume.summary.policies.shouldMention !== null ?
                                                noume.summary.policies.shouldMention.body.map((mention, i) => {
                                                    return (
                                                        <li key={i} className='list-inside list-disc'>{mention}</li>
                                                    )
                                                }) : <li className='list-inside list-disc'>None Found</li>}
                                        </ul>
                                    </div>

                                    <div className='w-full flex flex-col items-center'>
                                        <h2 className='font-black xl:text-[1.5rem] 2xl:text-[2rem] mb-2'>Children & Pets</h2>
                                        <ul className='xl:text-[0.8rem] text-left text-sm list-disc gap-[5px] flex flex-col max-h-[150px] overflow-y-scroll list-inside'>
                                            {noume.summary.policies.childAndBed !== null ?
                                                noume.summary.policies.childAndBed.body.map((list, i) => {
                                                    return (
                                                        <li key={i}>{list}</li>
                                                    )
                                                }) : <li>None Found(Children)</li>}
                                            {noume.summary.policies.pets !== null ?
                                                noume.summary.policies.pets.body.map((list, i) => {
                                                    return (
                                                        <li key={i}>{list}</li>
                                                    )
                                                }) : <li>None Found(Pets)</li>}
                                        </ul>
                                    </div>
                                </div>

                                <div className='flex w-full justify-center items-center flex-col gap-2 pb-5 xl:text-xl 2xl:text-2xl '>
                                    <h1> <span className='text-black/50'> <span className='text-green-600'>{selectedNoume.price.lead.formatted}</span> per night.</span></h1>
                                    <button className="primary-btn rounded-none text-2xl py-3 px-20" onClick={() => navigate(-1)}>Find Other Noumes</button>
                                </div>

                            </div>

                        </div>

                        <hr className='font-black' />


                        <div className='flex w-full justify-between items-stretch mb-28 mobile:flex-col mobile:gap-5'>
                            <div className='flex items-center w-full flex-col gap-2'>
                                <h2 className='text-2xl text-black/60 mobile:text-2xl'>Overall Rating: <span className='font-black text-black'>{noume.reviewInfo.summary.overallScoreWithDescriptionA11y.value}</span></h2>

                                {noume.reviewInfo.summary.propertyReviewCountDetails !== null ?
                                    <p className='text-xl mobile:text-md decoration-[#AA9BE6] hover:cursor-pointer underline hover:decoration-[3px]' onClick={fetchReviews}>
                                        {noume.reviewInfo.summary.propertyReviewCountDetails.shortDescription} &gt;
                                    </p> :
                                    <p className='text-xl mobile:text-md'>No reviews Available</p>
                                }
                            </div>

                            <div className='flex flex-col items-center w-full gap-2'>
                                <h2 className='font-black text-2xl mobile:text-2xl'>Check-In Instructions</h2>

                                <ul className='list-disc mobile:text-sm mobile:text-left mobile:px-10 mobile:list-inside'>
                                    {noume.summary.policies.checkinInstructions.map((list, i) => {
                                        return <li key={i}>{list}</li>
                                    })}
                                </ul>

                            </div>

                        </div>
                    </div>

                    <ReviewModal
                        show={showReviews}
                        reviews={reviews}
                        toggleReviews={(e) => toggleReviews(e)}
                    />

                    <PhotosModal
                        show={showPhotos}
                        photos={photos}
                        togglePhotos={(e) => togglePhotos(e)}
                    />

                </>
        )
    }
}

export default Noume