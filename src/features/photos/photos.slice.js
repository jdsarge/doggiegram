import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift(action.payload);
    },
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos. 
    // Task 1 Hint: You can use state.photos.unshift()
    // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    removePhoto: (state, action) => {
      const idToRemove = action.payload;
      const index = state.photos.findIndex(photo => photo.id === idToRemove);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    }
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const searchTerm = state.search.searchTerm.toLowerCase();  // Assuming your search state has a 'searchTerm' field
  const photos = state.photos.photos;  // Assuming your photos are stored in a 'photos' field inside the 'photos' slice

  if (!searchTerm) return photos;  // If there's no search term, return all photos

  // Return photos that have a caption matching the search term
  return photos.filter(photo => 
    photo.caption.toLowerCase().includes(searchTerm)
  );
};