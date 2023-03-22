import React, { useContext, useEffect, useMemo, useState } from 'react'
import Calendar from 'react-calendar';
import Ping from '../images/ping.png';
import CalendarIcon from '../images/calendar.png';
import Person from '../images/person.png';
import { QueriesContext } from '../data/QueriesContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { term, setTerm } = useContext(QueriesContext);
    const [predictedLocations, setPredictedLocations] = useState([]);
    const { selectedLocation, setSelectedLocation } = useContext(QueriesContext);
    const { checkIn, setCheckIn } = useContext(QueriesContext);
    const { checkOut, setCheckOut } = useContext(QueriesContext);
    const { rooms, setRooms } = useContext(QueriesContext);
    const { setNoumes } = useContext(QueriesContext);
    const { setLoading } = useContext(QueriesContext);
    const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useContext(QueriesContext);

    let adultLength = rooms.reduce((accum, room) => accum + room.adults, 0);
    let childrenLength = rooms.reduce((accum, room) => accum + room.children.length, 0);

    const queriesShow = (e) => {
        const previousSelects = document.querySelectorAll('.active');
        const targetElement = e.currentTarget.nextElementSibling;
        if (previousSelects.length > 0) {
            if (targetElement.classList === previousSelects[0].classList) {
                targetElement.classList.toggle("hidden");
            } else {
                previousSelects[0].classList.add('hidden');
                previousSelects[0].classList.remove('active');
                targetElement.classList.toggle("hidden");
                targetElement.classList.add("active");
            }
        }
        else {
            targetElement.classList.toggle("hidden");
            targetElement.classList.add("active");
        }
    };

    const fetchLocations = async () => {
        const results = await fetch(`https://hotels4.p.rapidapi.com/locations/v3/search?q=${term}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ae9171a8fbmsh26e3b73616d4dc1p1e51f1jsnd4121cd446e0',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            },
        })
            .then((res) => res.json())
            .then((data) => setPredictedLocations(data.sr))
            .catch((err) => console.error(err))
        document.querySelector('.locations').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const setLocation = ({ name, coordinates, index }) => {
        document.querySelector('.locations').classList.add('hidden');
        setTerm(name);
        setSelectedLocation({ name, index, coordinates });
    }

    const toggleLocations = () => {
        document.querySelector('.locations').classList.remove('hidden');
    }

    useEffect(() => {
        setCheckInDate(new Date());
        setCheckOutDate(new Date(new Date().setDate(new Date().getDate() + 1)))
    }, [])

    useEffect(() => {
        if (term && !predictedLocations.length) {
            fetchLocations();
        } else {
            const timeoutId = setTimeout(() => {
                if (term === '') {
                    document.querySelector('.locations').classList.add('hidden');
                }
                if (term) {
                    fetchLocations();
                }
            }, 500)

            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [term])

    const setCheckInDate = (date) => {
        document.querySelector('.checkIn').classList.toggle('hidden');
        let newDate = new Date(date);
        let indexOfComma = newDate.toLocaleString().indexOf(',');
        setCheckIn({
            day: newDate.getDate(),
            month: newDate.getMonth() + 1,
            year: newDate.getFullYear(),
            strDate: newDate.toLocaleString("en-US").slice(0, indexOfComma)
        });

        if (checkOut.strDate !== '') {
            if (Date.parse(newDate.toLocaleString("en-US").slice(0, indexOfComma)) >= Date.parse(checkOut.strDate)) {
                let newCheckOutDate = new Date(newDate.setDate(newDate.getDate() + 1));
                setCheckOutDate(newCheckOutDate);
            }
        }

    };

    const setCheckOutDate = (date) => {
        document.querySelector('.checkOut').classList.toggle('hidden');
        let newDate = new Date(date);
        let indexOfComma = newDate.toLocaleString().indexOf(',');
        setCheckOut({
            day: newDate.getDate(),
            month: newDate.getMonth() + 1,
            year: newDate.getFullYear(),
            strDate: newDate.toLocaleString("en-US").slice(0, indexOfComma)
        });
    };

    const setMinCheckOutDate = () => {
        if (checkIn.strDate !== '') {
            const date = new Date(checkIn.strDate);
            return new Date(date.setDate(date.getDate() + 1));
        }
        return new Date();
    };

    const decrementPerson = (key, i) => {
        const clonedRoom = { ...rooms[i] };
        const clonedState = [...rooms];
        if (key === 'children') {
            if (clonedRoom.children.length > 0) {
                clonedRoom.children.pop();
                clonedState[i] = clonedRoom;
                setRooms(clonedState);
            } else {
                return;
            }
        } else {
            clonedRoom[key] = clonedRoom[key] - 1;
            clonedState[i] = clonedRoom;
            setRooms(clonedState);
        }
    };
    const addPerson = (key, i) => {
        const clonedRoom = { ...rooms[i] };
        if (key === 'children') {
            clonedRoom[key] = [...clonedRoom[key], { age: 0 }];
        } else {
            clonedRoom[key] = clonedRoom[key] + 1;
        }
        const clonedState = [...rooms];
        clonedState[i] = clonedRoom;
        setRooms(clonedState)
    };

    const updatePerson = (key, value, i) => {
        const clonedRoom = { ...rooms[i] };
        if (key === 'children') {
            const newChildrenArray = [];
            for (let i = 0; i < value; i++) {
                newChildrenArray.push({ age: 0 });
            }
            clonedRoom[key] = newChildrenArray;
        } else {
            clonedRoom[key] = parseInt(value);
        }
        const clonedState = [...rooms];
        clonedState[i] = clonedRoom;
        setRooms(clonedState);
    };

    const handleChildrenAgeChange = (value, i, room) => {
        const index = rooms.indexOf(room);
        const clonedRoom = { ...rooms[index] };
        clonedRoom.children[i].age = parseInt(value);
        const clonedState = [...rooms];
        clonedState[index] = clonedRoom;
        setRooms(clonedState)
    };

    const mapThroughRooms = () => {
        return rooms.map((room, i) => {
            const { adults, children } = room;
            return (
                <div key={i} className='flex flex-col gap-5 border-black border-b'>
                    <p className='text-sm font-black underline pl-2'>
                        Room {i + 1}
                    </p>

                    <div className='flex justify-between px-3'>
                        <h2 className=''>
                            Adults
                        </h2>
                        <div className='flex justify-evenly w-1/2 border'>
                            <button className='hover:bg-gray-500/40 w-full py-1 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-slate-800/10' disabled={adults === 1} onClick={() => decrementPerson('adults', i)}>
                                -
                            </button>
                            <input type="number" min={0} value={adults} className='w-full border text-center' onChange={(e) => updatePerson('adults', e.target.value, i)} />
                            <button className='hover:bg-gray-500/40 w-full py-1' onClick={() => addPerson('adults', i)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-between px-3'>
                        <h2>Children</h2>
                        <div className='flex justify-evenly w-1/2 border'>
                            <button className='hover:bg-gray-500/40 w-full py-1 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-slate-800/10' disabled={children.length === 0} onClick={() => decrementPerson('children', i)}>
                                -
                            </button>
                            <input type="number" min={0} value={children.length} className='w-full border text-center' onChange={(e) => updatePerson('children', e.target.value, i)} />
                            <button className='hover:bg-gray-500/40 w-full py-1' onClick={() => addPerson('children', i)}>
                                +
                            </button>
                        </div>
                    </div>
                </div >
            )
        })
    };

    const mapChildrensAge = rooms.map((room) => room.children.map((child, i) => {
        return (
            <select
                className='border border-black'
                key={i}
                defaultValue={child.age}
                onChange={(e) => handleChildrenAgeChange(e.target.value, i, room)}
            >
                <option value="0">
                    0
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
        )
    })
    )

    const mapChildrenJSX = () => {
        if (childrenLength === 0) {
            return null;
        }
        return (
            <div className='flex flex-col gap-2 pt-1'>
                <h1 className='text-sm pl-2'>
                    Children's Age (Required)
                </h1>
                <div className='flex flex-wrap gap-3 mx-2'>
                    {mapChildrensAge}
                </div>
            </div>
        )
    }

    const deleteRoom = () => {
        if (rooms.length === 1) {
            alert('Must have at least one room');
            return;
        }
        let copyState = [...rooms];
        copyState.pop();
        setRooms(copyState);
    };

    const onMinRangeChange = (e) => {
        const range = document.querySelectorAll('.range-slider input')
        const progress = document.querySelector('.range-slider .progress')
        let maxRange = parseInt(maxPrice);
        let gap = 50;

        if (maxRange - e.target.value < gap) {
            if (e.target.classList[0] === 'range-min') {
                return;
            }
            else {
                setMaxPrice(e.target.value + gap);
            }
        }
        else {
            progress.style.left = (e.target.value / range[0].max) * 100 + '%';
            setMinPrice(e.target.value);
        }
    }

    const onMaxRangeChange = (e) => {
        const range = document.querySelectorAll('.range-slider input')
        const progress = document.querySelector('.range-slider .progress')
        let minRange = parseInt(minPrice);
        let gap = 50;

        if (e.target.value - minRange < gap) {
            if (e.target.classList[0] === 'range-min') {
                setMinPrice(e.target.value - gap);
            }
            else {
                return;
            }
        }
        else {
            progress.style.right = 100 - (e.target.value / range[1].max) * 100 + '%';
            setMaxPrice(e.target.value);
        }
    }

    const searchProperties = async () => {
        if (term.trim() === '') {
            alert('Location is needed to find Noumes');
            return;
        }
        setLoading(true);

        let fetchParams = {
            destination: {
                coordinates: {
                    latitude: parseFloat(selectedLocation.coordinates.lat),
                    longitude: parseFloat(selectedLocation.coordinates.long)
                }
            },
            checkInDate: {
                day: checkIn.day,
                month: checkIn.month,
                year: checkIn.year
            },
            checkOutDate: {
                day: checkOut.day,
                month: checkOut.month,
                year: checkOut.year
            },
            rooms,
            resultsStartingIndex: 0,
            resultsSize: 10,
            sort: "PRICE_LOW_TO_HIGH",
            filters: {
                price: {
                    max: parseInt(maxPrice),
                    min: parseInt(minPrice) + 1
                }
            }
        };

        if (location.pathname !== '/find-hotels') {
            navigate('/find-hotels');
        }

        const results = await fetch('https://hotels4.p.rapidapi.com/properties/v2/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': 'ae9171a8fbmsh26e3b73616d4dc1p1e51f1jsnd4121cd446e0',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            },
            body: `${JSON.stringify(fetchParams)}`
        })

        const data = await results.json();

        if (data.data === null) {
            setNoumes(null);
            setLoading(false);
        } else {
            setNoumes(data.data.propertySearch.properties);
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='flex justify-around items-center mobile:flex-col mobile:gap-2'>
                <div className='flex items-center justify-between gap-3 px-2 transition-all bg-white border-2 hover:border-black focus:border-black'>
                    <div>
                        <img src={Ping} alt="Location Icon" className='w-[20px]' />
                    </div>
                    <div className='relative flex flex-col'>
                        <label htmlFor="location" className='text-xs'>Location</label>
                        <input
                            id='location'
                            placeholder='Enter Destination or Hotel Name'
                            type="text"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            onFocus={toggleLocations}
                            className="min-w-[250px] outline-none text-lg placeholder:text-sm cursor-pointer"
                        />
                        <div className='absolute mt-12 -left-[41px] max-h-[150px] overflow-y-auto z-20 mobile:-left-[70px] mobile:max-h-[250px]' >
                            <ul className='locations hidden'>
                                {predictedLocations.length ?
                                    predictedLocations.map((location) => {
                                        return (
                                            <li
                                                className='p-1 border min-w-[400px] mobile:min-w-[350px] bg-white border-black cursor-pointer hover:text-black hover:primary-bg-color'
                                                key={location.essId.sourceId}
                                                onClick={(e) => setLocation({ name: location.regionNames.primaryDisplayName, index: location.index, coordinates: { lat: location.coordinates.lat, long: location.coordinates.long } })}
                                            >
                                                {location.regionNames.primaryDisplayName}
                                            </li>
                                        )
                                    })
                                    : <div className="spinner"></div>}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-3 px-2 py-1 justify-between transition-all bg-white border-2 hover:border-black focus:border-black'>
                    <img src={CalendarIcon} alt="calendar icon" className='w-[23px]' />
                    <div className='flex flex-col relative'>
                        <label className='cursor-pointer text-xs' htmlFor="checkInBtn">Check In</label>
                        <button
                            id='checkInBtn'
                            className='text-md queries'
                            onClick={(e) => {
                                queriesShow(e);
                                document.querySelector('.checkIn').scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                        >
                            {checkIn.strDate === '' ? 'Select Date' : `${checkIn.strDate}`}
                        </button>

                        <Calendar
                            className={'hidden checkIn transition-all absolute -left-[45px] mobile:-left-[140px] z-20'}
                            onChange={(e) => setCheckInDate(e)}
                            minDate={new Date()}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-3 px-2 py-1 justify-between transition-all bg-white border-2 hover:border-black focus:border-black'>
                    <img src={CalendarIcon} alt="calendar icon" className='w-[23px]' />
                    <div className='flex flex-col relative'>
                        <label className='cursor-pointer text-xs' htmlFor="checkOutBtn">Check Out</label>
                        <button
                            id='checkOutBtn'
                            className='text-md queries'
                            onClick={(e) => {
                                queriesShow(e);
                                document.querySelector('.checkOut').scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                        >
                            {checkOut.strDate === '' ? 'Select Date' : `${checkOut.strDate}`}
                        </button>

                        <Calendar
                            className={'hidden checkOut transition-all absolute -left-[45px] mobile:-left-[140px] z-20'}
                            onChange={(e) => setCheckOutDate(e)}
                            minDate={setMinCheckOutDate()}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-3 px-2 py-1 justify-between transition-all bg-white border-2 hover:border-black focus:border-black'>
                    <img src={Person} alt="person icon" className='w-[23px]' />
                    <div className='flex flex-col relative'>
                        <label htmlFor="people" className="cursor-pointer text-xs">{rooms.length > 1 ? `${rooms.length} Rooms` : '1 Room'}</label>

                        <button
                            id='people'
                            className='queries'
                            onClick={(e) => {
                                queriesShow(e);
                                document.querySelector('#peopleList').scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                        >
                            {adultLength} Adults, {childrenLength} Children
                        </button>

                        <div id='peopleList' className='hidden absolute mt-12 border border-black min-w-[300px] -left-[85px] bg-white max-h-[250px] overflow-y-auto z-20'>
                            <>
                                <button
                                    className='text-sm absolute right-1 top-1 border border-black px-1 hover:bg-gray-400/50'
                                    onClick={() => document.querySelector('#peopleList').classList.add('hidden')}

                                >
                                    Close
                                </button>
                                {mapThroughRooms()}
                            </>
                            {mapChildrenJSX()}

                            <div className='mt-5 text-sm flex justify-between'>
                                <button
                                    onClick={() => deleteRoom()}
                                    className='m-1 w-1/2 py-1 bg-red-500 hover:bg-red-600'
                                >
                                    Remove Room
                                </button>
                                <button
                                    onClick={() => setRooms([...rooms, { adults: 2, children: [{ age: 0 }] }])}
                                    className='m-1 w-1/2 py-1 bg-green-500 hover:bg-green-600'
                                >
                                    Add Room
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className='flex flex-col justify-center items-center w-full mt-5'>
                {/* <h1 className='mt-4 text-md'>Price Range</h1> */}
                <div className='range-container flex justify-center items-center w-[30%] border xl:w-[45%] mobile:w-3/4'>
                    <div className='min-value numberVal'>
                        <p className="bg-white flex justify-center items-center text-center w-[50px] h-[30px] text-[15px]">$ {minPrice}</p>
                    </div>

                    <div className='range-slider relative w-full h-[5px] bg-gray-400 outline-none m-[10px] rounded-[50px]'>
                        <div className='progress absolute left-[0%] right-[75%] h-full primary-bg-color rounded-[50px]'></div>
                        <input className='range-min absolute -top-[7px] -left-[5px] w-[101%] transition-all outline-none cursor-pointer bg-black text-black' title={minPrice} type="range" min={0} max={600} value={minPrice} onInput={(e) => onMinRangeChange(e)} />
                        <input className='range-max absolute -top-[7px] -left-[5px] w-[101%] outline-none cursor-pointer' type="range" min={0} max={600} value={maxPrice} onInput={(e) => onMaxRangeChange(e)} />
                    </div>

                    <div className='max-value numberVal'>
                        <p className='w-[50px] h-[30px] bg-white flex justify-center items-center text-[15px] text-center'>$ {maxPrice}</p>
                    </div>
                </div>
            </div>



            <div className='w-full flex justify-center items-center pt-3'>
                <button
                    className='primary-btn px-3'
                    onClick={() => searchProperties()}
                >
                    Search
                </button>
            </div>
        </div>


    )
}

export default SearchBar