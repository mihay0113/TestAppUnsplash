import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  PhotosActionTypes,
} from './actions';

interface PhotosState {
  loading: boolean;
  photos: any[];
  error: string;
  page: number;
}

const initialState: PhotosState = {
  loading: false,
  photos: [],
  error: '',
  page: 1,
};

function photosReducer(state = initialState, action: PhotosActionTypes): PhotosState {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: [...state.photos, ...action.payload],
        page: state.page + 1,
      };
    case FETCH_PHOTOS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export default photosReducer;
