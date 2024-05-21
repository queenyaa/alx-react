import React from 'react';
import { getFooterCopy } from '../utils/utils';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="App-footer">
            <p>{getFooterCopy()}</p>
        </footer>
    )
}