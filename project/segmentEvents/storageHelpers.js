import { v4 as uuidv4 } from 'uuid';

import {
    getSessionStorageItem,
    setSessionStorageItem,
    clearSessionStorageItem,
} from '../utils/storage';

export const getBetslipId = () => getSessionStorageItem('bet_slip_id');
export const setBetslipId = () => setSessionStorageItem('bet_slip_id', `${uuidv4()}-${Date.now()}`)
export const clearBetslipId = () => clearSessionStorageItem('bet_slip_id');

export const getBetBasketTimer = () => getSessionStorageItem('bet_basket_timer');
export const startBetBasketTimer = () => setSessionStorageItem('bet_basket_timer', Date.now());
export const resetBetBasketTimer = () => clearSessionStorageItem('bet_basket_timer');
