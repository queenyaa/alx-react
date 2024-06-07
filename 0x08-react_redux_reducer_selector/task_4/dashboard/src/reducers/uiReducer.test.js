import { Map } from 'immutable';
import {
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from '../actions/uiActionTypes';

import uiReducer from './uiReducer';

describe('uiReducer', () => {
    it('should return the initial state when no action is passed', () => {
        const newState = uiReducer(undefined, {});
        expect(newState).toEqual(Map({
            isNotificationDrawerVisible: false,
            isUserLoggedIn: false,
            user: Map({}),
        }));
    });

    it('should return the initial state when an unknown action is passed', () => {
        const newState = uiReducer(undefined, { type: 'UNKNOWN_ACTION' });
        expect(newState).toEqual(Map({
            isNotificationDrawerVisible: false,
            isUserLoggedIn: false,
            user: Map({}),
        }));
    });

    it('should set isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
        const newState = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
        expect(newState.get('isNotificationDrawerVisible')).toBe(true);
    });

    it('should set isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER action is passed', () => {
        const newState = uiReducer(Map({ isNotificationDrawerVisible: true }), { type: HIDE_NOTIFICATION_DRAWER });
        expect(newState.get('isNotificationDrawerVisible')).toBe(false);
    });

    it('should set isUserLoggedIn to true when LOGIN_SUCCESS action is passed', () => {
        const newState = uiReducer(undefined, { type: LOGIN_SUCCESS });
        expect(newState.get('isUserLoggedIn')).toBe(true);
    });

    it('should set isUserLoggedIn to false when LOGIN_FAILURE action is passed', () => {
        const newState = uiReducer(undefined, { type: LOGIN_FAILURE });
        expect(newState.get('isUserLoggedIn')).toBe(false);
    });

    it('should set isUserLoggedIn to false when LOGOUT action is passed', () => {
        const newState = uiReducer(undefined, { type: LOGOUT });
        expect(newState.get('isUserLoggedIn')).toBe(false);
    });
});