import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import ArticlesList from '../components/Articles/ArticlesList'
import { useUser } from '../contexts/UserContext'
import styles from '../styles/Articles.module.css'
const Articles = () => {


  const {checkAuth, user, loading, logout} = useUser()
  const router = useRouter()
  useEffect(() => { 
    const authenticate = async ()=>{
      if(!user){
        const auth = await checkAuth()
        if(auth){
          console.log('Authenticated')
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
        <div className={styles.grid}>
          <h1 className='text-center' >Liste Des Articles</h1>
          <button className='btn btn-info' >Nouveau Article</button>
        </div>
        {/* <ArticlesList /> */}
      </Container>
    </>
  )
}

export default Articles