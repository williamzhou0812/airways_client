import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import apartmentsReducer from "./apartmentsReducer";
import featuresReducer from "./featuresReducer";
import galleryReducer from "./galleryReducer";
import mapsReducer from "./mapsReducer";
import apartmentDetailReducer from "./apartmentDetailReducer";
import featureDetailReducer from "./featureDetailReducer";
import videosReducer from "./videosReducer";
import restVideoCurrentTimeReducer from "./restVideoCurrentTimeReducer";
import promotionListReducer from "./promotionListReducer";
import directoryDisplayReducer from "./directoryDisplayReducer";
import sectionReducer from "./sectionReducer";
import directoryDisplayBySectionReducer from "./directoryDisplayBySectionReducer";
import currentSectionReducer from "./currentSectionReducer";
import directoryDisplayDetailReducer from "./directoryDisplayDetailReducer";
import backButtonReducer from "./backButtonReducer";
import currentMenuReducer from "./currentMenuReducer";

export default combineReducers({
    router: routerReducer,
    apartmentsList: apartmentsReducer,
    featuresList: featuresReducer,
    galleryList: galleryReducer,
    mapsList: mapsReducer,
    apartmentDetail: apartmentDetailReducer,
    featureDetail: featureDetailReducer,
    videosList: videosReducer,
    restVideoCurrentTime: restVideoCurrentTimeReducer,
    promotionList: promotionListReducer,
    directoryDisplayList: directoryDisplayReducer,
    sectionList: sectionReducer,
    directoryDisplayListBySection: directoryDisplayBySectionReducer,
    currentSection: currentSectionReducer,
    backButton: backButtonReducer,
    directoryDisplayDetail: directoryDisplayDetailReducer,
    currentMenu: currentMenuReducer
});
