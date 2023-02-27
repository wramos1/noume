import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';

const Noume = () => {
    const { id } = useParams();
    const [noume, setNoume] = useState(null);
    const [loading, setLoading] = useState(false)

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
            console.log(data.data)
            setNoume(data.data.propertyInfo)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setLoading(true);
        findNoume();
    }, [])

    const makeStars = () => {
        let iconArr = [];
        for (let i = 0; i < noume.summary.overview.propertyRating.rating; i++) {
            iconArr.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" fill="rgba(170,155,230,1)" /></svg>);
        }
        return iconArr;
    }

    {
        return (
            !noume ?
                <div className="spinner"></div>
                :
                <div className='min-h-[100vh]'>
                    <Navbar classProps={'bg-[#7468AD] text-white p-5'} />
                    <div className='pt-28 flex flex-col gap-12'>
                        <div className='flex px-4 max-h-[505px]'>
                            <div className='w-full flex flex-col'>
                                <img
                                    className='w-full h-full self-end border-4 border-[#AA9BE6]'
                                    src={noume.propertyGallery.images[0].image.url}
                                    alt="property" />
                                <p className='pt-2'>View More Photos <span className='primary-bg-color p-1 rounded-[50%] text-white'>{noume.propertyGallery.thumbnailGalleryDialog.trigger.value}</span></p>
                            </div>

                            <div className='w-full flex flex-col justify-between'>
                                <div className='w-full'>
                                    <div className='w-full inline-flex items-center'>
                                        <h1 className='noume-title w-[35%]'></h1>
                                        <h1 className='items-center flex 2xl:text-5xl xl:text-4xl w-full text-center justify-center'>
                                            {noume.summary.name}
                                        </h1>
                                        <span className='inline-flex gap-1 text-sm justify-between w-[35%]'>{makeStars()}</span>
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
                                        <ul className='w-3/5 text-left text-sm gap-[5px] list-disc flex flex-col max-h-[150px] overflow-y-scroll list-inside'>
                                            {noume.summary.amenities.topAmenities.items !== null ?
                                                noume.summary.amenities.topAmenities.items.map((amenity, i) => {
                                                    return (
                                                        <li key={i} className='text-color'>{amenity.text}</li>
                                                    )
                                                }) : null}
                                        </ul>
                                    </div>

                                    <div className='w-full flex flex-col items-center'>
                                        <h2 className='font-black xl:text-[1.5rem] 2xl:text-[2rem] mb-2'>Things to Note</h2>
                                        <ul className='text-left text-sm gap-[5px] flex flex-col max-h-[150px] overflow-y-scroll'>
                                            {noume.summary.policies.shouldMention.body !== null ?
                                                noume.summary.policies.shouldMention.body.map((mention, i) => {
                                                    return (
                                                        <li key={i} className='list-inside list-disc'>{mention}</li>
                                                    )
                                                }) : null}
                                        </ul>
                                    </div>

                                    <div className='w-full flex flex-col items-center'>
                                        <h2 className='font-black xl:text-[1.5rem] 2xl:text-[2rem] mb-2'>Children/Pets</h2>
                                        <ul className='text-left text-sm list-disc gap-[5px] flex flex-col max-h-[150px] overflow-y-scroll list-inside'>
                                            {noume.summary.policies.childAndBed.body !== null ?
                                                noume.summary.policies.childAndBed.body.map((list, i) => {
                                                    return (
                                                        <li key={i}>{list}</li>
                                                    )
                                                }) : null}
                                            {noume.summary.policies.pets.body !== null ?
                                                noume.summary.policies.pets.body.map((list, i) => {
                                                    return (
                                                        <li key={i}>{list}</li>
                                                    )
                                                }) : null}
                                        </ul>
                                    </div>
                                </div>

                                <div className='flex w-full justify-center items-center flex-col gap-2 pb-5 xl:text-lg 2xl:text-2xl '>
                                    <h1> <span className='text-black/50'>per night.</span></h1>
                                    <button className="primary-btn rounded-none text-2xl py-3 px-20">Book Now</button>
                                </div>

                            </div>

                        </div>

                        <hr className='font-black' />


                        <div className='flex w-full justify-between'>
                            <div className='flex justify-center items-center w-full flex-col gap-2'>
                                <h2 className='text-2xl text-black/60'>Overall Rating: <span className='font-black text-black'>{noume.reviewInfo.summary.overallScoreWithDescriptionA11y.value}</span></h2>

                                <p className='text-xl'>
                                    {noume.reviewInfo.summary.propertyReviewCountDetails.shortDescription} &gt;
                                </p>
                            </div>

                            <div className='flex justify-center items-center w-full'>
                                <h2 className='font-black text-2xl'>Check-In Instructions</h2>

                                <ul className='list-disc'>
                                    {noume.summary.policies.checkinInstructions.map((list, i) => {
                                        return <li key={i}>{list}</li>
                                    })}
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
        )
    }
}

export default Noume