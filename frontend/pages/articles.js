import React from 'react'
import { Container } from 'react-bootstrap'
import ArticlesList from '../components/Articles/ArticlesList'

const artciles = () => {
  return (
    <>
      <Container className='mt-4'>
        <h1>Liste Des Articles</h1>
        <ArticlesList />
      </Container>
    </>
  )
}

export default artciles