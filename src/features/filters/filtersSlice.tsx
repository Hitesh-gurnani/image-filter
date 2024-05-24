import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filters {
    brightness: number;
    contrast: number;
    saturate: number;
    sepia: number;
    blackandwhite: number;
    imageUrl: string;
    overlaytext?: string;
}

interface FiltersState extends Filters {
    recents: Array<{ imageUrl: string, filters: Filters }>;
}

const initialState: FiltersState = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    blackandwhite: 0,
    imageUrl: 'https://picsum.photos/id/100/300/200',
    overlaytext: '',
    recents: [],
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setBrightness: (state, action: PayloadAction<number>) => {
            state.brightness = action.payload;
        },
        setContrast: (state, action: PayloadAction<number>) => {
            state.contrast = action.payload;
        },
        setSaturate: (state, action: PayloadAction<number>) => {
            state.saturate = action.payload;
        },
        setSepia: (state, action: PayloadAction<number>) => {
            state.sepia = action.payload;
        },
        setBlackAndWhite: (state, action: PayloadAction<number>) => {
            state.blackandwhite = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        },
        setOverlayText: (state, action: PayloadAction<string>) => {
            state.overlaytext = action.payload;
        },
        resetAll: (state) => {
            state.blackandwhite = 0;
            state.contrast = 100;
            state.saturate = 100;
            state.sepia = 0;
            state.brightness = 100;
        },
        addRecent: (state, action: PayloadAction<{ imageUrl: string, filters: Filters }>) => {
            state.recents.push(action.payload);
        }
    },
});

export const {
    setBrightness,
    setContrast,
    setSaturate,
    setSepia,
    setBlackAndWhite,
    setImageUrl,
    resetAll,
    addRecent,
    setOverlayText
} = filtersSlice.actions;

export default filtersSlice.reducer;
