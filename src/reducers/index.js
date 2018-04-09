import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import apartmentsReducer from './apartmentsReducer';
import featuresReducer from './featuresReducer';
import galleryReducer from './galleryReducer';
import mapsReducer from './mapsReducer';

export default combineReducers({
    router: routerReducer,
    apartmentsList: apartmentsReducer,
    featuresList: featuresReducer,
    galleryList: galleryReducer,
    mapsList: mapsReducer
});
