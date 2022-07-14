
import { combineReducers } from 'redux';

import auth from "./auth"
import status from './status'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// export default combineReducers({
//     auth,
//     status
// });

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth', 'status'],
  };

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['user'], // only persist "isLoggedIn"
  };

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, auth),
    status
  });

export default persistReducer(rootPersistConfig, rootReducer);