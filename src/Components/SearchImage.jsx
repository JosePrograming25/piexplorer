const SearchImage = ({ search, reference }) => {
  const handlerSubmit = e => {
    e.preventDefault()
    const query = e.target.firstElementChild
    if (!query.value) {
      query.value = ''
      return undefined
    }
    search(query.value)
  }
  return (
    <div className=' my-4 flex-1 text-center mb-10'>
      <form onSubmit={handlerSubmit}>
        <input ref={reference} id='search' className='w-[250px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow' type='search' placeholder='Search...' />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1'
        >Search
        </button>
      </form>
    </div>

  )
}

export default SearchImage
