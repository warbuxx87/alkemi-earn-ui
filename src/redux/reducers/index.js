// Imports: Dependencies

import { combineReducers } from 'redux';
// Imports: Reducers
import { connectRouter } from 'connected-react-router'
import User from './User';
import Data from './Data';
import Countries from './Countries'
import Category from './Category';
import MarketComm from './MarketComm';
import Product from './SectorDetail';
import MarketForecast from './MarketForecast';
import Card from './Card';
import SubscriptionPlan from './SubscriptionPlan';
import Chart from './Chart'
import DataHome from './DataHome'

const createRootReducer = (history) => {
    const reducers = combineReducers({
        User : User,
        Data : Data,
        Chart : Chart,
        Countries: Countries,
        Category: Category,
        MarketComm: MarketComm,
        Product:Product,
        MarketForecast: MarketForecast,
        Card: Card,
        SubscriptionPlan: SubscriptionPlan,
        DataHome : DataHome,
        router: connectRouter(history),
    });
    return reducers;
  };

// Exports
export default createRootReducer;