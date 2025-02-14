import React, { useEffect, useRef, useState } from 'react'
import SearchImage from './Components/SearchImage'
import axios from 'axios'
import ImageList from './Components/ImageList'
import ViewDetail from './Components/ViewDetail'

const App = () => {
  const [images, setImages] = useState([])
  const [pag, setPag] = useState(1)
  const [loading, setLoading] = useState(false)
  const [context, setContext] = useState('random')
  const [query, setQuery] = useState('')
  const [maxPag, setMaxPag] = useState(1)
  const [noImages, setNoImages] = useState(false)
  const [viewDetail, setViewDetail] = useState(false)
  const observer = useRef()
  const lastImageRef = useRef()
  const resetSearch = useRef(null)

  const contextDate = {
    random: {
      link: 'https://api.unsplash.com/photos/?client_id=oTjsXIukzdKSinMlUBo7G8FZ48DC6Llr1KlTcctc3bg',
      head: {
        params: { per_page: 30, page: pag }
      }
    },
    search: {
      link: 'https://api.unsplash.com/search/photos',
      head: {
        params: {
          client_id: 'oTjsXIukzdKSinMlUBo7G8FZ48DC6Llr1KlTcctc3bg',
          query, // Contexto de búsqueda
          per_page: 30,
          page: pag
        }
      }
    }
  }

  const getImages = async () => {
    try {
      setLoading(true)
      const response = await axios.get(contextDate[context].link, contextDate[context].head)
      const data = response.data

      if (!data.results) {
        setImages((prevImg) => [...prevImg, ...data])
      } else {
        setImages((prevImg) => [...prevImg, ...data.results])
        setMaxPag(data.total_pages)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error al buscar imágenes:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getImages()
  }, [pag, context])

  useEffect(() => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (context === 'search') {
          if (pag === maxPag) setNoImages(true)
          if (pag < maxPag) {
            setPag((prev) => prev + 1)
          }
        } else {
          setPag((prev) => prev + 1)
        }
      }
    })

    if (lastImageRef.current) observer.current.observe(lastImageRef.current)
  }, [loading, pag, maxPag])

  const handleSearch = (searchTerm) => {
    setContext('search')
    setQuery(searchTerm)
    setPag(1)
    setImages([])
  }

  const handlerClick = e => {
    setContext('random')
    setPag(1)
    setImages([])
    getImages()
    setNoImages(false)
    if (resetSearch.current) {
      resetSearch.current.value = ''
    }
  }

  const handlerViewDetail = prop => {
    setViewDetail(prop)
  }

  return (
    <>
      {viewDetail ? <ViewDetail image={viewDetail} viewDetail={handlerViewDetail} /> : undefined}
      <h1 onClick={handlerClick} className='text-5xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center pt-5 mb-5 cursor-pointer'>
        Pixplorer
      </h1>
      <SearchImage search={handleSearch} reference={resetSearch} />
      <ImageList viewDetail={handlerViewDetail} imagesList={images} reference={lastImageRef} load={loading} />
      {noImages &&
        <p className='z-50 text-xl font-[#333] py-2 px-6  rounded-xl shadow-lg shadow-black--500/40 text-center mb-11 pb-4 pt-16'>
          search for {query} over
        </p>}
    </>
  )
}

export default App
