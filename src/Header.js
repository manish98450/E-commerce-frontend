import React, { useEffect, useState } from "react";
import './style.css';

const Header = ({ user }) => {
    const [wish, setWish] = useState('');
    const [stl, setStl] = useState('');

    useEffect(() => {
        // Determine the appropriate greeting based on the current time
        const date = new Date().getHours();
        if (date < 12) {
            setWish('Good Morning');
            setStl('mrng');
        } else if (date < 16) {
            setWish('Good Afternoon');
            setStl('aftr');
        } else {
            setWish('Good Evening');
            setStl('eve');
        }
    }, []);

    const username = user ? user.username : '';

    return (
        <div>
            <h1 className={stl}>{wish} {username} Ji</h1>
        </div>
    );
};

export default Header;
