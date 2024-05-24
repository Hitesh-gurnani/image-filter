import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addRecent, resetAll, setImageUrl } from '../features/filters/filtersSlice';

import RecentImages from './RecentImages';
import { useRef, useEffect } from 'react';
function ImageSection() {
    const dispatch = useDispatch();
    const { brightness, contrast, saturate, sepia, blackandwhite, imageUrl, overlaytext } = useSelector((state: RootState) => state.filters);
    const draggableRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const draggable = draggableRef.current;
        const image = imageRef.current;

        if (!draggable || !image) return;

        let offsetX = 0, offsetY = 0, isDragging = false;

        const onMouseDown = (e: MouseEvent) => {
            offsetX = e.clientX - draggable.getBoundingClientRect().left;
            offsetY = e.clientY - draggable.getBoundingClientRect().top;
            isDragging = true;
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Constrain movement within the image
            const imageRect = image.getBoundingClientRect();
            const draggableRect = draggable.getBoundingClientRect();

            if (newX < imageRect.left) newX = imageRect.left;
            if (newY < imageRect.top) newY = imageRect.top;
            if (newX + draggableRect.width > imageRect.right) newX = imageRect.right - draggableRect.width;
            if (newY + draggableRect.height > imageRect.bottom) newY = imageRect.bottom - draggableRect.height;

            draggable.style.left = `${newX - imageRect.left}px`;
            draggable.style.top = `${newY - imageRect.top}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        draggable.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            draggable.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);
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
                <span className='border border-solid border-[#262626] px-6 rounded-[4px]'>{'Premagic'}</span>
                <button className='bg-[#444db3] px-3 py-1 rounded-[2px] text-white' onClick={fetchRandomImage}>New</button>
            </div>
            <div className="inline-block relative">
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Filtered"
                    style={filterStyle}
                    className=""
                />
                <div
                    ref={draggableRef}
                    className="absolute bg-opacity-70 p-2 cursor-move"
                    style={{ position: 'absolute', top: '0px', left: '0px', zIndex: 1000 }}
                >
                    {overlaytext}
                </div>
            </div>
            <RecentImages />
        </div>
    )
}

export default ImageSection
