import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Photo {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    regular: string;
  };
  user: {
    name: string;
    username: string;
  };
}

export interface PhotosState {
  photos: Photo[];
  page: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PhotosState = {
  photos: [],
  page: 1,
  loading: 'idle',
  error: null,
};


export const KEY = '896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043';

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async (page: number) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/photos?page=${page}&order_by=popular&client_id=${KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page++;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = 'pending';
        console.log(state.loading);
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = 'succeeded';

        action.payload.forEach((newItem: Photo) => {
          let exists = state.photos.some(item => {
            return item.id === newItem.id;
          });

          if (!exists) {
            state.photos.push(newItem);
          }
        });

        console.log('succeeded');
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
        console.log(state.loading);
      });
  },
});
