import React from 'react';
import '../Notifications/Notifications.css';
import closeIcon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
    const handleClick = () => {
        console.log('Close button has been clicked');
    };

    return (
        <div className="Notifications">
            <button
                style={{
                    position: 'absolute',
                    border: 'none',
                    top: 10,
                    right: 10,
                }}
                aria-label="Close"
                onClick={handleClick}
                >
                <img src={closeIcon} alt="Close icon" height="10" width="10"/>
            </button>
            <p>Here is the list of notifications</p>
            <ul>
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }} />
            </ul>
        </div>
    );
}

export default Notifications;