import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { 
    Container, 
    Header, 
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    Username,
    Icon,
    HighlightCards,
} from './styles';

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://github.com/douglasdl.png'}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <Username>Douglas</Username>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>   
            </Header>

            <HighlightCards> 
                <HighlightCard 
                    title="Entradas"
                    type="up"
                    amount="R$17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                /> 
                <HighlightCard 
                    title="Saídas"
                    type="down"
                    amount="R$1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                /> 
                <HighlightCard 
                    title="Total"
                    type="total"
                    amount="R$16.141,00"
                    lastTransaction="01 à 16 de abril"
                /> 
            </HighlightCards>
        </Container>
    );
}