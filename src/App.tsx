import { Provider } from 'react-redux'
import './App.css'
import FilterSection from './components/FilterSection'
import ImageSection from './components/ImageSection'
import { store } from './store/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <div className='flex'>
          <ImageSection />
          <FilterSection />
        </div>
      </Provider>

    </>
  )
}

export default App
