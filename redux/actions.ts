import axios from 'axios';

export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

export const KEY = '896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043';

export interface Photo {
  id: string;
  author: string;
  url: string;
  width: number;
  height: number;
}

export interface FetchPhotosRequestAction {
  type: typeof FETCH_PHOTOS_REQUEST;
}

export interface FetchPhotosSuccessAction {
  type: typeof FETCH_PHOTOS_SUCCESS;
  payload: Photo[];
}

export interface FetchPhotosFailureAction {
  type: typeof FETCH_PHOTOS_FAILURE;
  error: string;
}

export type PhotosActionTypes =
  | FetchPhotosRequestAction
  | FetchPhotosSuccessAction
  | FetchPhotosFailureAction;

export function fetchPhotos(page: number): any {
  const url = `https://api.unsplash.com/photos?page=${page}&client_id=${KEY}`;
  return async (dispatch: any) => {
    dispatch({ type: FETCH_PHOTOS_REQUEST });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(page);
      dispatch({ type: FETCH_PHOTOS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PHOTOS_FAILURE, error: error.message });
    }
  };
}
