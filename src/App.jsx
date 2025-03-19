import React, { useEffect, useRef, useState } from 'react'
import SearchImage from './Components/SearchImage'
import axios from 'axios'
import ImageList from './Components/ImageList'
import ViewDetail from './Components/ViewDetail'

const App = () => {
  const [images, setImages] = useState([]) // se almacenan las imágenes
  const [pag, setPag] = useState(1) // se almacena la página actual
  const [loading, setLoading] = useState(false) // se almacena el estado de carga
  const [context, setContext] = useState(['random']) // se almacena el contexto de búsqueda
  const [query, setQuery] = useState('') // se almacena el término de búsqueda
  const [maxPag, setMaxPag] = useState(1) // se almacena el número máximo de páginas de la búsqueda
  const [noImages, setNoImages] = useState(false) // se especifica si no hay más imágenes
  const [viewDetail, setViewDetail] = useState(false) // se almacena la imagen a visualizar
  const [error, setError] = useState(null) // se almacena el error
  const observer = useRef() // obse
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
      const response = await axios.get(contextDate[context[0]].link, contextDate[context[0]].head)
      const data = response.data
      setError(null)

      if (!data.results) { // si no es una busqueda de imagenes añade las imagenes aleatorias
        setImages((prevImg) => [...prevImg, ...data])
      } else {
        setImages((prevImg) => [...prevImg, ...data.results])
        setMaxPag(data.total_pages) // indica el maximo de imagenes de la busqueda
      }

      setLoading(false) // termino de cargar la api
    } catch (error) {
      if (error.status === 403) {
        setError('no results found')
      }

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
        if (context[0] === 'search') {
          if (pag === maxPag) setNoImages(true)
          if (pag < maxPag) { // maxPag nos dice si hay mas paginas a renderizar
            setPag((prev) => prev + 1)
          }
        } else {
          setPag((prev) => prev + 1)
        }
      }
    }) // evalua si el usuario llego al final de la pagina para cargar mas imagenes

    if (lastImageRef.current) observer.current.observe(lastImageRef.current)
  }, [loading, pag, maxPag])

  const handleSearch = (searchTerm) => {
    const copia = ['search']
    setContext([...copia])
    setQuery(searchTerm)
    setPag(1)
    setImages([])
  }

  const handlerClick = e => { // volvemos a la pagina principal
    const copia = ['random']
    setContext([...copia])
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
          end of {query} the search
        </p>}
      {error && <p className='z-50 text-xl font-[#333] py-2 px-6  rounded-xl shadow-lg shadow-black--500/40 text-center mb-11 pb-4 pt-16'>{error}</p>}
    </>
  )
}

export default App
