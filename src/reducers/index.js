import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import apartmentsReducer from './apartmentsReducer';
import featuresReducer from './featuresReducer';
import galleryReducer from './galleryReducer';
import mapsReducer from './mapsReducer';
import apartmentDetailReducer from './apartmentDetailReducer';
import featureDetailReducer from './featureDetailReducer';
import videosReducer from './videosReducer';
import restVideoCurrentTimeReducer from './restVideoCurrentTimeReducer';

export default combineReducers({
    router: routerReducer,
    apartmentsList: apartmentsReducer,
    featuresList: featuresReducer,
    galleryList: galleryReducer,
    mapsList: mapsReducer,
    apartmentDetail: apartmentDetailReducer,
    featureDetail: featureDetailReducer,
    videosList: videosReducer,
    restVideoCurrentTime: restVideoCurrentTimeReducer
});
