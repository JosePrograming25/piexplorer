import ImageCard from './ImageCard.jsx'
import Masonry from 'react-layout-masonry'

const ImageList = ({ imagesList, reference, load, viewDetail }) => {
  return (
    <div>
      <Masonry columns={{ 500: 1, 650: 2, 900: 3, 1250: 4, 1450: 5, 1800: 6 }}>

        {imagesList.map((element, i) =>
          (
            <ImageCard viewDetail={viewDetail} image={element} key={element.id} ref={i === imagesList.length - 1 ? reference : null} />
          )
        )}
        {load && <p className='fixed top-[95%] left-1/2 transform -translate-x-1/2 -translate-y-[95%] z-50 text-xl font-bold py-2 px-6 bg-[#fdfdfdcc] rounded-xl shadow-lg shadow-black--500/40'>Loading...</p>}

      </Masonry>
    </div>

  )
}

export default ImageList
