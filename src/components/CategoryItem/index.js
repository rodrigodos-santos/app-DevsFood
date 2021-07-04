import React from 'react'
import { Container, CategoryImage } from './styled'

export default ({data, activeCategory, setActiveCategory}) => {
    //Passa o ID para o componente pai
    const handleCategoryClick = () => {
        setActiveCategory( data.id )
    }

    return (
        <Container 
            active={activeCategory} 
            id={data.id}
            onClick={handleCategoryClick}
        >
            <CategoryImage src={data.image} />
        </Container>
    )
}