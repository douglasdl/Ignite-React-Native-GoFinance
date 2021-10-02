import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { useFocusEffect } from '@react-navigation/native';

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
    LoadContainer,
} from './styles';
import theme from '../../global/styles/theme';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    incomes: HighlightProps;
    expenses: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    /* 
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
        {
            id: 9,
            type: 'positive',
            title: "Aluguel (BTC) - VIIA3",
            amount: "R$0,02",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "23/09/2021"
        },
        {
            id: 10,
            type: 'positive',
            title: "Aluguel (BTC) - VIIA3",
            amount: "R$0,84",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "24/09/2021"
        },
        {
            id: 11,
            type: 'positive',
            title: "Dividendos - XPIN11",
            amount: "R$20,16",
            category: {
                name: "FIIs",
                icon: "dollar-sign"
            },
            date: "24/09/2021"
        },
        {
            id: 12,
            type: 'positive',
            title: "Aluguel (BTC) - VIIA3",
            amount: "R$0,88",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "28/09/2021"
        },
        {
            id: 13,
            type: 'positive',
            title: "Juros sobre Capital (JCP) - BRDT3",
            amount: "R$85,09",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "29/09/2021"
        },
        {
            id: 14,
            type: 'positive',
            title: "Juros sobre Capital (JCP) - BBAS3",
            amount: "R$125,62",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "30/09/2021"
        },
        {
            id: 15,
            type: 'positive',
            title: "Dividendos - ITUB4",
            amount: "R$9,00",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "30/09/2021"
        },
        {
            id: 16,
            type: 'positive',
            title: "Juros sobre Capital (JCP) - POMO4",
            amount: "R$17,85",
            category: {
                name: "Ações",
                icon: "dollar-sign"
            },
            date: "04/04/2022"
        },
    ];
    */

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let totalIncomes = 0;
        let totalExpenses = 0;

        const transactionsFormatted:DataListProps[] = transactions
        .map((item:DataListProps) => {
            if(item.type === 'positive') {
                totalIncomes += Number(item.amount);
            } else {
                totalExpenses += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // 2-digit, numeric, narrow, short e long
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                date,
                type: item.type,
                category: item.category,
            }

        });

        setTransactions(transactionsFormatted);

        const total2 = totalIncomes - totalExpenses;
       
        setHighlightData({
            incomes: {
                amount: totalIncomes.toLocaleString('pt-BR', { 
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expenses: {
                amount: totalExpenses.toLocaleString('pt-BR', { 
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total2.toLocaleString('pt-BR', { 
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });

        setIsLoading(false);
    }

    // The depencies arrays is empty to load the list only once
    useEffect(() => {
        // Change this to true if need to clear all data (for tests and debug)
        const wannaClearData = false;
        if(wannaClearData) {
            const dataKey = '@gofinances:transactions';
            AsyncStorage.removeItem(dataKey);
        }
        
        loadTransactions();
    },[]);


    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    return (
        <Container>
            { 
                isLoading 
                ?   
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer> 
                :
                <>
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
                            amount={highlightData.incomes.amount}
                            lastTransaction="Última entrada dia 13 de abril"
                        /> 
                        <HighlightCard 
                            title="Saídas"
                            type="down"
                            amount={highlightData.expenses.amount}
                            lastTransaction="Última saída dia 03 de abril"
                        /> 
                        <HighlightCard 
                            title="Total"
                            type="total"
                            amount={highlightData.total.amount}
                            lastTransaction="01 à 16 de abril"
                        /> 
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionsList
                            data={transactions}
                            keyExtractor={ item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />
                    </Transactions>
                </>
            }
        </Container>
    );
}