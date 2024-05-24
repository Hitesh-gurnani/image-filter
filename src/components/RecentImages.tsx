import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setBlackAndWhite, setBrightness, setContrast, setImageUrl, setSaturate, setSepia } from '../features/filters/filtersSlice';

const RecentsList: React.FC = () => {
    const recents = useSelector((state: RootState) => state.filters.recents);
    // console.log(recents, "TEST")
    const dispatch = useDispatch();
    const handleRecentImageClick = (image: { imageUrl: any; filters: any; }) => {
        const { imageUrl, filters } = image;
        dispatch(setImageUrl(imageUrl));
        dispatch(setBrightness(filters.brightness));
        dispatch(setContrast(filters.contrast));
        dispatch(setSaturate(filters.saturate));
        dispatch(setSepia(filters.sepia));
        dispatch(setBlackAndWhite(filters.blackandwhite));
    };
    return (
        <div>
            <h2>Recent Images</h2>
            <div className='flex h-[150px] w-full flex-wrap'>
                {recents.map((image, index) => (
                    <img
                        key={index}
                        src={image.imageUrl}
                        alt={`Recent ${index}`}
                        className='w-[200px] h-[150px]'
                        onClick={() => handleRecentImageClick(image)}
                        style={{
                            filter: `
                        brightness(${image.filters.brightness}%)
                        contrast(${image.filters.contrast}%)
                        saturate(${image.filters.saturate}%)
                        sepia(${image.filters.sepia}%)
                        grayscale(${image.filters.blackandwhite}%)
                      `, cursor: 'pointer', margin: '5px'
                        }}
                    />
                ))}
            </div>

        </div>
    );
};

export default RecentsList;
