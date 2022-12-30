import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap'
import ArticlesList from '../components/Articles/ArticlesList'
import { useMessages } from '../contexts/MessageContext'
import { useUser } from '../contexts/UserContext'
import styles from '../styles/Articles.module.css'
import { fetchWithCreds } from '../utils/utils'
const Articles = () => {


  const {checkAuth, user, loading} = useUser()
  const {addMessage} = useMessages()
  
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedArticle, setSelectedArticle] = useState()
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const fetchArticles = async()=>{
    const response = await fetchWithCreds("/api/supply/articles/")
    if(!response || response.status == 404 || response.status == 500){
      return addMessage({type:"warning", msg:"Somthing went wrong err_code : "+response.status})
    }
    if(response.status != 200){
      const errMsg = await response.json()
      return addMessage({type:"warning", msg:JSON.stringify(errMsg)})
    }else{
      const articles = await response.json()
      setArticles(articles.results)
      console.log('articles', articles)
    }

  }
  const fetchCategories = async()=>{
    const response = await fetchWithCreds("/api/supply/categories/")
    if(!response || response.status == 404 || response.status == 500){
      return addMessage({type:"warning", msg:"Somthing went wrong err_code : "+response.status})
    }
    if(response.status != 200){
      const errMsg = await response.json()
      return addMessage({type:"warning", msg:JSON.stringify(errMsg)})
    }else{
      const categories = await response.json()
      setCategories(categories.results)
      console.log('categories', categories)
    }

  }
  const submitForm = async(e)=>{
    e.preventDefault()
    alert(JSON.stringify(selectedArticle))
    console.log(selectedArticle)
  }
  useEffect(() => { 
    const authenticate = async ()=>{
      if(!user){
        const auth = await checkAuth()
        if(auth){
          fetchArticles()
          fetchCategories()
        }else{
          router.push('/login')
        }
      }
    }
    authenticate()

  }, [])

  if(loading || loading === undefined) return (
    <div className='w-100 m-auto text-center mt-5'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  </div>
  )

  return (
    <>
      <Container className='mt-4'>
        <div className={`${styles.grid} my-5`}>
          <h1 className='text-center' >Liste Des Articles</h1>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-info text-white' onClick={()=>setShowModal(true)}>Nouveau Article</button>
          </div>
        </div>
        <ArticlesList articles={articles} />
      </Container>

      <Modal show={showModal} onHide={()=>setShowModal(false)}>
      <Form onSubmit={(e)=>updateOrCreateTodo(e)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedArticle?.id ? "Modifier Un Produit" : "Nouveau Produit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <Form.Group className="mb-3" controlId="productName" >
                <Form.Label>Désignation</Form.Label>
                <Form.Control required type="text" value={selectedArticle?.name} onChange={(e)=>setSelectedArticle((data)=>({...data, name:e.target.value}))} placeholder="Le nom de produit" />
              </Form.Group>              
            </div>
            <div className='col-sm-12 col-md-6'>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Prix De Base</Form.Label>
                <Form.Control required type="text" value={selectedArticle?.base_price} onChange={(e)=>setSelectedArticle((data)=>({...data, base_price:e.target.value}))}  placeholder="Describe your todo" />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>TVA</Form.Label>
                <Form.Control min={0} max={0.2} step={0.01} required type="number" value={selectedArticle?.tva} onChange={(e)=>setSelectedArticle((data)=>({...data, tva:e.target.value}))}  placeholder="Describe your todo" />
              </Form.Group>

          <Form.Group className="mb-3" controlId="todoDone">
            <Form.Label>Unité De Mésure</Form.Label>
            <Form.Select  value={selectedArticle?.unit} onChange={(e)=>setSelectedArticle((data)=>({...data, unit:e.target.value}))} >
              <option value="UNITE">Unité</option>
              <option value="KG">KG</option>
              <option value="G">G</option>
              <option value="L">L</option>
              <option value="SAC">SAC</option>
              <option value="BOUTEILLE">BOUTEILLE</option>
              <option value="CARTON">CARTON</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="todoDone">
            <Form.Label>Categorie</Form.Label>
            <Form.Select value={selectedArticle?.category} onChange={(e)=>setSelectedArticle((data)=>({...data, category:e.target.value}))}>
              {categories.map(category=>(
                <option key={category.id} >{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={(e)=>submitForm(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>

      </Modal>

    </>
  )
}

export default Articles