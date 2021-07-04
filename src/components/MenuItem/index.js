import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LinkArea, LinkIcon } from './styled';

export default ({title, icon, link}) => {
    const history = useHistory();
    const location = useLocation();

    /* Compara a rota atual com o link de destino */
    let isActive = location.pathname == link;

    /* Função utilizada para que o usuário possa abrir o link em 
    outra página sem erro e o clique não recarregue a página */
    const handleLinkClick = (e) => {
        e.preventDefault();     
        history.push( link );   
    }

    return(
        <LinkArea data-tip={title} data-for="tip-right" active={isActive} href={link} onClick={handleLinkClick}>
            <LinkIcon src={icon} />
        </LinkArea>
    );
}