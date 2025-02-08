import { forwardRef } from 'react'

const ImageCard = forwardRef(({ image }, ref) => {
  return (
    <div ref={ref} className='w-full h-auto object-cover mb-4 view-timeline-name-reveal animate-show animation-timeline-reveal animation-range-entry-cover px-2'>
      <img className='w-full' src={image.urls.small_s3} alt={image.alternative_slugs.en} />
      <div className='hidden'>
        <p>{image.alt_description}</p>
        <a href={image.links.download} download={image.links.download} target='_blank' rel='noreferrer'><button>Descargar</button></a>
      </div>
    </div>
  )
})

export default ImageCard
