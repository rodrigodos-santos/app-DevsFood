import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import ReactTooltip from 'react-tooltip'
import {
    Container,
    CategoryArea,
    CategoryList,
    ProductArea,
    ProductList,
    ProductPaginationArea,
    ProductPaginationItem
} from './styled'

import api from '../../api'

import Header from '../../components/Header'
import CategoryItem from '../../components/CategoryItem'
import ProductItem from '../../components/ProductItem'
import Modal from '../../components/Modal'
import ModalProduct from '../../components/ModalProduct'

let searchTimer = null

export default () => {
    const history = useHistory();
    const [headerSearch, setHeaderSearch] = useState('')
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    const [modalStatus, setModalStatus] = useState(false)
    const [modalData, setModalData] = useState({})


    const [activeCategory, setActiveCategory] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [activeSearch, setActiveSearch] = useState('')

    const getProducts = async () => {
        const prods = await api.getProducts(activeCategory, activePage, activeSearch)
        if (prods.error == '') {
            setProducts(prods.result.data)
            setTotalPages(prods.result.pages) //seta a qtde de pages
            setActivePage(prods.result.page)
        }
    }

    /* Chamada para barra de pesquisa */
    useEffect(() => {
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
            setActiveSearch(headerSearch)
        }, 2000)
    }, [headerSearch])

    /* Chamado para carregar as categorias */
    useEffect(() => {
        const getCategories = async () => {
            const cat = await api.getCategories()
            if (cat.error == '') {
                setCategories(cat.result)
            }
            /* Utilizado para dar um rebuild pois o tooltip 
                iniciou antes dos itens carregarem */
            ReactTooltip.rebuild()
        }
        getCategories()
    }, [])

    /* Chamada sempre que mudar a categoria, página ou pesquisa, 
        mudam os produtos */
    useEffect(() => {
        setProducts([])
        getProducts()
    }, [activeCategory, activePage, activeSearch])

    const handleProductClick = (data) => {
        setModalData(data)
        setModalStatus(true)
    }

    return (
        <Container>
            <Header search={headerSearch} onSearch={setHeaderSearch} />
            {categories.length > 0 &&
                <CategoryArea>
                    Selecione uma categoria
                    <CategoryList>
                        <CategoryItem
                            data={{
                                id: 0,
                                name: 'Todas as categorias',
                                image: '/assets/food-and-restaurant.png'
                            }}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                        {categories.map((item, index) => (
                            <CategoryItem
                                key={index}
                                data={item}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        ))}
                    </CategoryList>
                </CategoryArea>
            }

            {products.length > 0 &&
                <ProductArea>
                    <ProductList>
                        {products.map((item, index) => (
                            <ProductItem
                                key={index}
                                data={item}
                                onClick={handleProductClick}
                            />
                        ))}
                    </ProductList>
                </ProductArea>
            }

            {totalPages > 0 &&
                <ProductPaginationArea>
                    {/*Cria um array com a quantidade de pages*/}
                    {Array(totalPages).fill(0).map((item, index) => (
                        <ProductPaginationItem
                            key={index}
                            active={activePage}
                            current={index + 1}
                            onClick={() => setActivePage(index + 1)}
                        >
                            {index + 1}
                        </ProductPaginationItem>
                    ))}
                </ProductPaginationArea>
            }
            <Modal status={modalStatus} setStatus={setModalStatus}>
                <ModalProduct data={modalData} setStatus={setModalStatus} />
            </Modal>
        </Container>
    );
}