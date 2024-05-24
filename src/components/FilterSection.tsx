import { FaMagic } from "react-icons/fa";
import { setBrightness, setBlackAndWhite, setContrast, setSaturate, setSepia } from '../features/filters/filtersSlice'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { resetAll } from '../features/filters/filtersSlice'

function FilterAndValue({ filter, onChange, value }: { filter: any, onChange: (value: number) => { payload: number; type: string }, value: number }) {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(onChange(parseInt(e.target.value)));
    };
    return (
        <div className="flex flex-col w-[150px]">
            <div className="flex items-center gap-4">
                <div>{filter.name}</div>
                <input value={value} onChange={handleChange} type="text" style={{ width: '50px', height: '20px', border: '1px solid #6c6c6c' }} />
            </div>
            <div className="slidecontainer">
                <input type="range" min="1" max="100" onChange={handleChange} value={value} className="cursor-pointer" id="myRange" />
            </div>
        </div>
    )
}
function FilterSection() {
    const filters = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();
    const filterArr = [{
        name: 'Brigtness',
        actionfn: setBrightness,
        value: filters.brightness
    }, {
        name: 'Saturate',
        actionfn: setSaturate,
        value: filters.saturate
    }, {
        name: 'Contrast',
        actionfn: setContrast,
        value: filters.contrast
    }, {
        name: 'Sepia',
        actionfn: setSepia,
        value: filters.sepia
    }, {
        name: 'Black/White',
        actionfn: setBlackAndWhite,
        value: filters.blackandwhite
    }]

    return (
        <div className='bg-[#b7b7b8] min-w-[50vw] h-[100vh] p-6'>
            <div className='flex justify-between'>
                <div className='flex gap-3 items-center'>
                    <FaMagic />
                    <span>Filters</span>
                </div>
                <div className='self-end text-purple-600 underline cursor-pointer' onClick={() => dispatch(resetAll())}>Reset</div>
            </div>
            <div className="flex gap-x-[300px] gap-y-[80px] flex-wrap mt-[50px]">
                {
                    filterArr.map((filter) => {
                        return (
                            <FilterAndValue filter={filter} onChange={filter.actionfn} value={filter.value} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FilterSection
