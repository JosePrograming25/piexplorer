import ImageCard from './Imagecard'
import Masonry from 'react-layout-masonry'

const ImageList = ({ imagesList, reference, load }) => {
  return (
    <div>
      <Masonry columns={{ 400: 1, 600: 2, 800: 3, 1000: 4, 1300: 5, 1500: 6 }}>

        {imagesList.map((element, i) =>
          (
            <ImageCard image={element} key={element.id} ref={i === imagesList.length - 1 ? reference : null} />
          )
        )}
        {load && <p className='fixed top-[95%] left-1/2 transform -translate-x-1/2 -translate-y-[95%] z-50 text-xl font-bold py-2 px-6 bg-[#fdfdfdcc] rounded-xl shadow-lg shadow-black--500/40'>Loading...</p>}

      </Masonry>
    </div>

  )
}

export default ImageList
