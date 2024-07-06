import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { errorsReducer as errors } from './errors';
import { sessionReducer as session } from './session';
import { devicesReducer as devices } from './devices';
import { categoriesReducer as categories } from './categories';
import { cctvReducer as cctv } from './cctv';
import { complaintsReducer as complaints } from './complaints';
import { cmsReducer as cms } from './cms';
import { eventsReducer as events } from './events';
import { geofencesReducer as geofences } from './geofences';
import { groupsReducer as groups } from './groups';
import { driversReducer as drivers } from './drivers';
import { maintenancesReducer as maintenances } from './maintenances';
import { calendarsReducer as calendars } from './calendars';
import { reportsReducer as reports } from './reports';
import { dummyReducer as dummy } from './dummy';
import { clinicsReducer as clinics } from './mapOverlay';
import { cctvClinicsReducer as cctvClinics } from './cctvMapOverlay';
import { sosReducer as sos } from './sos';
import { filterReducer as filter } from './filter';
import { handleToastReducer as handleToast } from './handleToast';
import throttleMiddleware from './throttleMiddleware';

const reducer = combineReducers({
  errors,
  session,
  devices,
  events,
  geofences,
  groups,
  drivers,
  categories,
  cctv,
  complaints,
  maintenances,
  calendars,
  reports,
  cms,
  dummy,
  clinics,
  cctvClinics,
  sos,
  filter,
  handleToast,
});

export { errorsActions } from './errors';
export { sessionActions } from './session';
export { devicesActions } from './devices';
export { categoriesActions } from './categories';
export { cctvActions } from './cctv';
export { complaintsActions } from './complaints';
export { cmsActions } from './cms';
export { eventsActions } from './events';
export { geofencesActions } from './geofences';
export { groupsActions } from './groups';
export { driversActions } from './drivers';
export { maintenancesActions } from './maintenances';
export { calendarsActions } from './calendars';
export { reportsActions } from './reports';
export { dummyActions } from './dummy';
export { clinicsActions } from './mapOverlay';
export { cctvClinicsActions } from './cctvMapOverlay';
export { sosActions } from './sos';
export { filterActions } from './filter';
export { handleToastActions } from './handleToast';

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(throttleMiddleware),
});
