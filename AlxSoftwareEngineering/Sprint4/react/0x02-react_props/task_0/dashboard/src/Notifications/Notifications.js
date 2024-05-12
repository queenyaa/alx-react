import React from 'react';
import '../Notifications/Notifications.css';
import closeIcon from './../assets/closeicon.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

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
                <NotificationItem type="default" value="New course available" />
                <NotificationItem type="urgent" value="New resume available" />
                <NotificationItem type="urgent" html={{ __html: getLatestNotification() }} />
            </ul>
        </div>
    );
}

export default Notifications;