import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addRecent, resetAll, setImageUrl } from '../features/filters/filtersSlice';

import RecentImages from './RecentImages';
function ImageSection() {
    const dispatch = useDispatch();
    const { brightness, contrast, saturate, sepia, blackandwhite, imageUrl } = useSelector((state: RootState) => state.filters);

    const filterStyle = {
        filter: `
          brightness(${brightness}%)
          contrast(${contrast}%)
          saturate(${saturate}%)
          sepia(${sepia}%)
          grayscale(${blackandwhite}%)
        `,
    };
    const fetchRandomImage = async () => {
        try {

            const randomId = Math.floor(Math.random() * 91) + 10;
            const newImageUrl = `https://picsum.photos/id/${randomId}/300/200`;
            // will reset the filters to inital state and set new random image 
            // addedly will store the existing image to recents
            const currentFilters = {
                brightness,
                contrast,
                saturate,
                sepia,
                blackandwhite,
                imageUrl,
            };
            dispatch(addRecent({ imageUrl, filters: currentFilters }));
            dispatch(resetAll());
            dispatch(setImageUrl(newImageUrl));
        } catch (error) {
            console.error('Error fetching random image:', error);
        }
    };
    // const handleRecentImageClick = (imageUrl: string, filters: any) => {
    //     dispatch(setFilters({ imageUrl, ...filters }));
    // };
    return (
        <div className='flex flex-col min-w-[50vw] px-8 py-3'>
            <div className='flex justify-between items-center'>
                <span className='border border-solid border-[#262626] px-6 rounded-[4px]'>Untitled Image</span>
                <button className='bg-[#444db3] px-3 py-1 rounded-[2px] text-white' onClick={fetchRandomImage}>New</button>
            </div>
            <div className='mt-4'>
                <img
                    src={imageUrl}
                    alt="Filtered"
                    style={filterStyle}
                />
            </div>
            <RecentImages />
        </div>
    )
}

export default ImageSection
