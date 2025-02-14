const ViewDetail = ({ image, viewDetail }) => {
  console.log(image)

  return (
    <div className='w-full h-full bg-[#000000ee] fixed z-50 flex items-center justify-center flex-col'>
      <div className='w-3/4 flex justify-end'><span onClick={() => viewDetail(false)} className='text-white font-bold pb-2 cursor-pointer'>X</span></div>
      <img className='w-3/4' src={image.urls.regular} alt='' />
    </div>
  )
}

export default ViewDetail
