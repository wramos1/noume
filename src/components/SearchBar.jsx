import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import Navbar from './Navbar';
import Ping from '../images/ping.png';
import CalendarIcon from '../images/calendar.png';
import Person from '../images/person.png';

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const [predictedLocations, setPredictedLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({ index: null, name: '', coordinates: { lat: null, long: null } });
    const [checkIn, setCheckIn] = useState({ day: null, month: null, year: null, strDate: '' });
    const [checkOut, setCheckOut] = useState({ day: null, month: null, year: null, strDate: '' });
    const [rooms, setRooms] = useState([{ adults: 2, children: [{ age: 0 }] }]);



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
            }, 1000)

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
                    <p className='text-xs font-black underline'>
                        Room {i + 1}
                    </p>

                    <div className='flex justify-between'>
                        <h2 className=''>
                            Adults
                        </h2>
                        <div className='flex justify-evenly w-1/2 border-green-500 border'>
                            <button className='hover:bg-gray-500/40 w-full' onClick={() => decrementPerson('adults', i)}>
                                -
                            </button>
                            <input type="number" min={0} value={adults} className='w-full border-2 text-center' onChange={(e) => updatePerson('adults', e.target.value, i)} />
                            <button className='hover:bg-gray-500/40 w-full' onClick={() => addPerson('adults', i)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <h2>Children</h2>
                        <div className='flex justify-evenly w-1/2 border-green-500 border'>
                            <button className='hover:bg-gray-500/40 w-full' onClick={() => decrementPerson('children', i)}>
                                -
                            </button>
                            <input type="number" min={0} value={children.length} className='w-full border-2 text-center' onChange={(e) => updatePerson('children', e.target.value, i)} />
                            <button className='hover:bg-gray-500/40 w-full' onClick={() => addPerson('children', i)}>
                                +
                            </button>
                        </div>
                    </div>
                </div >
            )
        })
    }

    return (
        <div className='h-screen'>
            <Navbar bg={'icon-bg'} paddingSize={'py-5'} />
            <div className='flex pt-20 justify-around items-center'>
                <div className='flex items-center justify-between gap-3 px-2 transition-all border-2 hover:border-black focus:border-black'>
                    <div>
                        <img src={Ping} alt="" className='w-[20px]' />
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
                        <div className='absolute mt-12' >
                            <ul className='locations bg-blue-500 hidden'>
                                {predictedLocations.length ?
                                    predictedLocations.map((location, i) => {
                                        return (
                                            <li
                                                className='bg-black border w-[400px] border-white text-white cursor-pointer hover:bg-slate-500'
                                                key={location.essId.sourceId}
                                                onClick={(e) => setLocation({ name: location.regionNames.primaryDisplayName, index: location.index, coordinates: { lat: location.coordinates.lat, long: location.coordinates.long } })}
                                            >
                                                {location.regionNames.primaryDisplayName}
                                            </li>
                                        )
                                    })
                                    : null}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-3 px-2 py-1 justify-between transition-all border-2 hover:border-black focus:border-black'>
                    <img src={CalendarIcon} alt="calendar icon" className='w-[23px]' />
                    <div className='flex flex-col relative'>
                        <label className='cursor-pointer text-xs' htmlFor="checkInBtn">Check In</label>
                        <button
                            id='checkInBtn'
                            className='text-md'
                            onClick={() => document.querySelector('.checkIn').classList.toggle('hidden')}
                        >
                            {checkIn.strDate === '' ? 'Select Date' : `${checkIn.strDate}`}
                        </button>

                        <Calendar
                            className={'hidden checkIn transition-all absolute'}
                            onChange={(e) => setCheckInDate(e)}
                            minDate={new Date()}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-3 px-2 py-1 justify-between transition-all border-2 hover:border-black focus:border-black'>
                    <img src={CalendarIcon} alt="calendar icon" className='w-[23px]' />
                    <div className='flex flex-col relative'>
                        <label className='cursor-pointer text-xs' htmlFor="checkOutBtn">Check Out</label>
                        <button
                            id='checkOutBtn'
                            className='text-md'
                            onClick={() => document.querySelector('.checkOut').classList.toggle('hidden')}
                        >
                            {checkOut.strDate === '' ? 'Select Date' : `${checkOut.strDate}`}
                        </button>

                        <Calendar
                            className={'hidden checkOut transition-all absolute'}
                            onChange={(e) => setCheckOutDate(e)}
                            minDate={setMinCheckOutDate()}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-3 px-2 py-1 justify-between transition-all border-2 hover:border-black focus:border-black'>
                    <img src={Person} alt="person icon" className='w-[23px]' />
                    <div className='flex flex-col relative'>
                        <label htmlFor="people" className="cursor-pointer text-xs">{rooms.length} Rooms</label>
                        <button
                            id='people'
                        >
                            {rooms.reduce((accum, room) => accum + room.adults, 0)} Adults,
                            {rooms.reduce((accum, room) => accum + room.children.length, 0)} Children
                        </button>

                        <div className='absolute mt-12 border border-black min-w-[200px] -left-10'>
                            {mapThroughRooms()}
                            <div className='flex flex-wrap'>
                                {rooms.map((room) => room.children.map((child, i) => {
                                    return (
                                        <select
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
                                }))}
                            </div>
                            <div>
                                <button onClick={() => setRooms([...rooms, { adults: 2, children: [{ age: 0 }] }])}>
                                    Add Room
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SearchBar