import { forwardRef } from 'react'
import { limitString } from './utilities'

const ImageCard = forwardRef(({ image, viewDetail }, ref) => {
  const handlerClick = e => {
    viewDetail(image)
  }

  return (
    <div onClick={handlerClick} ref={ref} className='w-full h-auto relative show-description cursor-pointer '>
      <div className='p-1'>
        <img className='w-full' src={image.urls.small_s3} alt={image.alternative_slugs.en} />
      </div>
      <div className='text-gray-50 transition-opacity duration-500 ease-in-out absolute description-image-show bg-[#000000d3] w-custom bottom-[0.2rem] left-[0.2rem] py-3 px-2 cursor-default flex justify-between items-center'>
        <div className='w-40'>
          <a className='pl-3 cursor-pointer text-gray-100/90 hover:text-gray-50'>View More...</a>
        </div>
        <a href={image.user.links.html} target='_blank' rel='noreferrer'>
          <div className='flex font-bold cursor-pointer justify-end gap-2 items-center'>
            <p><span>{limitString(image.user.name, 10)}</span></p>
            <img className='w-1/4 rounded-full shadow-lg shadow-zinc-700' src={image.user.profile_image.large} alt={image.user.name} />
          </div>
        </a>

      </div>
    </div>
  )
})

export default ImageCard
