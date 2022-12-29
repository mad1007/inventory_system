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
  const [selectedArticle, setSelectedArticle] = useState()
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const fetchArticles = async()=>{
    const response = await fetchWithCreds("/api/supply/articles/")
    if(!response || response.status == 404){
      return addMessage({type:"warning", msg:"Couldnt authenticate"})
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

  useEffect(() => { 
    const authenticate = async ()=>{
      if(!user){
        const auth = await checkAuth()
        if(auth){
          await fetchArticles()
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
        <Form.Group className="mb-3" controlId="productName" >
            <Form.Label>Désignation</Form.Label>
            <Form.Control required type="text" value={selectedArticle?.name} onChange={(e)=>setSelectedArticle((data)=>({...data, name:e.target.value}))} placeholder="Le nom de produit" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Prix De Base</Form.Label>
            <Form.Control required type="text" value={selectedArticle?.price} onChange={(e)=>setSelectedArticle((data)=>({...data, price:e.target.value}))}  placeholder="Describe your todo" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="todoDeadline">
            <Form.Label>DeadLine</Form.Label>
            <Form.Control type="datetime-local" value={selectedArticle?.deadline} onChange={(e)=>setSelectedArticle((data)=>({...data, deadline:e.target.value}))} placeholder="Enter a deadline" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="todoDone">
            <Form.Check checked={selectedArticle?.done} type="checkbox" onChange={(e)=>setSelectedArticle((data)=>({...data, done:e.target.checked}))} label="Done" />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>

      </Modal>

    </>
  )
}

export default Articles