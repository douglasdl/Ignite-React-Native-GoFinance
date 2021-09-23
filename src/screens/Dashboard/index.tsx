import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
    Container, 
    Header, 
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    Username,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: 1,
            type: 'positive',
            title: "Desenvolvimento de Site",
            amount: "R$12.000,00",
            category: {
                name: "Vendas",
                icon: "dollar-sign"
            },
            date: "13/04/2021"
        },
        {
            id: 2,
            type: 'negative',
            title: "Mc Donalds",
            amount: "R$59,00",
            category: {
                name: "Alimentação",
                icon: "coffee"
            },
            date: "10/04/2021"
        },
        {
            id: 3,
            type: 'negative',
            title: "Aluguel do Apartamento",
            amount: "R$1.200,00",
            category: {
                name: "Casa",
                icon: "home"
            },
            date: "10/04/2021"
        },
        {
            id: 4,
            type: 'positive',
            title: "Dividendos - AESB3",
            amount: "R$18,15",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "22/09/2021"
        },
        {
            id: 5,
            type: 'positive',
            title: "Aluguel (BTC) - VIIA3",
            amount: "R$0,33",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "22/09/2021"
        },
        {
            id: 6,
            type: 'positive',
            title: "Aluguel (BTC) - VIIA3",
            amount: "R$0,04",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "21/09/2021"
        },
        {
            id: 7,
            type: 'positive',
            title: "Venda - Tesouro Direto",
            amount: "R$0,00",
            category: {
                name: "Renda Fixa",
                icon: "dollar-sign"
            },
            date: "21/09/2021"
        },
        {
            id: 8,
            type: 'positive',
            title: "Aluguel (BTC) - VIIA3",
            amount: "R$0,13",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "20/09/2021"
        },
    ];
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
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
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

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList
                    data={data}
                    keyExtractor={ item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
   
            </Transactions>
        </Container>
    );
}