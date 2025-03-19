const ViewDetail = ({ image, viewDetail }) => {
  return (
    <div className='w-full h-full bg-[#000000ee] fixed z-50 flex items-center justify-center flex-col p-10'>
      <span onClick={() => viewDetail(false)} className='text-white font-bold cursor-pointer absolute top-1 right-3'>X</span>
      <img className='max-h-full' src={image.urls.regular} alt={image.user.name} />
    </div>
  )
}

export default ViewDetail
