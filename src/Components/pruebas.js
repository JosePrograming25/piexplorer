// Variables
let page = 1
const limit = 10 // Número de elementos a cargar por página
let loading = false

// Función para cargar más contenido
async function loadMoreContent () {
  if (loading) return
  loading = true

  try {
    const response = await fetch(`https://api.example.com/items?page=${page}&limit=${limit}`)
    const newItems = await response.json()

    if (newItems.length === 0) {
      // No hay más elementos para cargar
      window.removeEventListener('scroll', handleScroll)
      return
    }

    // Añadir nuevos elementos al DOM
    const container = document.getElementById('content-container')
    newItems.forEach(item => {
      const element = document.createElement('div')
      element.textContent = item.name // Ajusta esto según la estructura de tus datos
      container.appendChild(element)
    })

    page++
    loading = false
  } catch (error) {
    console.error('Error loading more content:', error)
    loading = false
  }
}

// Función para manejar el evento de scroll
function handleScroll () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
    loadMoreContent()
  }
}

// Añadir el evento de scroll
window.addEventListener('scroll', handleScroll)

// Cargar contenido inicial
loadMoreContent()
