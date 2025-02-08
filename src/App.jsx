import React, { useEffect, useRef, useState } from 'react'
import SearchImage from './Components/SearchImage'
import axios from 'axios'
import ImageList from './Components/ImageList'

const App = () => {
  const [images, setImages] = useState([])
  const [pag, setPag] = useState(1)
  const [loading, setLoading] = useState(false)
  const observer = useRef()
  const lastImageRef = useRef()

  const getImages = async (page) => {
    try {
      setLoading(true)
      const response = await axios.get('https://api.unsplash.com/photos/?client_id=oTjsXIukzdKSinMlUBo7G8FZ48DC6Llr1KlTcctc3bg', {
        params: { per_page: 30, page, query: 'hola' }
      })
      const data = await response.data
      setImages(prevImg => [...prevImg, ...data])
      setLoading(false)
    } catch (error) {
      console.error('Error al buscar imágenes:', error)
    }
  }

  useEffect(() => {
    getImages(pag)
  }, [pag])

  useEffect(() => {
    if (loading) return undefined
    console.log(observer.current)
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPag(prev => prev + 1)
      }
    })

    if (lastImageRef.current) observer.current.observe(lastImageRef.current)
  }, [loading])

  return (
    <>
      <h1 className='text-5xl text-center font-semibold mt-6 mb-2'>Welcome Pixplorer</h1>
      <SearchImage />
      <ImageList imagesList={images} reference={lastImageRef} load={loading} />
    </>
  )
}

export default App
