import React from 'react'
import { Table } from 'react-bootstrap'

const ArticlesList = ({articles}) => {
  return (
    <Table striped  hover className='text-center' >
      <thead>
        <tr>
          <th>Désignation</th>
          <th>Prix HT</th>
          <th>% TVA</th>
          <th>Prix TTC</th>
          <th>Niveau De Stock</th>
          <th>Categorie</th>
        </tr>
      </thead>
      <tbody>
        {articles.length===0 ? <tr><td colSpan={6} className="text-center">Pas De Produits</td></tr>:(articles.map(article=>(
          <tr key={article.id}>
            <td>{article.name}</td>
            <td>{article.base_price.toFixed(2)}</td>
            <td>{article.tva * 100}%</td>
            <td>{(article.base_price * (1+article.tva)).toFixed(2)}</td>
            <td>{article.inventory_level}</td>
            <td>{article.category_name}</td>
          </tr>
        )))}
      </tbody>
    </Table>
  )
}

export default ArticlesList