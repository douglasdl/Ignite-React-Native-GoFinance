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
    lastTransaction: string;
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
            id: '1',
            type: 'positive',
            name: "Desenvolvimento de Site",
            amount: "R$12.000,00",
            category: {
                name: "Vendas",
            },
            date: "13/04/2021"
        },
        {
            id: '2',
            type: 'negative',
            name: "Mc Donalds",
            amount: "R$59,00",
            category: "Alimentação",
            date: "10/04/2021"
        },
        {
            id: '3',
            type: 'negative',
            name: "Aluguel do Apartamento",
            amount: "R$1.200,00",
            category: "Casa",
            date: "10/04/2021"
        },
        {
            id: '4',
            type: 'positive',
            name: "Dividendos - AESB3",
            amount: "R$18,15",
            category: "Ações",
            date: "22/09/2021"
        },
        {
            id: '5',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,33",
            category: "Ações",
            date: "22/09/2021"
        },
        {
            id: '6',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,04",
            category: "Ações",
            date: "21/09/2021"
        },
        {
            id: '7',
            type: 'positive',
            name: "Venda - Tesouro Direto",
            amount: "R$0,00",
            category: "Renda Fixa",
            date: "21/09/2021"
        },
        {
            id: '8',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,13",
            category: "Ações",
            date: "20/09/2021"
        },
        {
            id: '9',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,02",
            category: "Ações",
            date: "23/09/2021"
        },
        {
            id: '10',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,84",
            category: "Ações",
            date: "24/09/2021"
        },
        {
            id: '11',
            type: 'positive',
            name: "Dividendos - XPIN11",
            amount: "R$20,16",
            category: "FIIs",
            date: "24/09/2021"
        },
        {
            id: '12',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,88",
            category: "Ações",
            date: "28/09/2021"
        },
        {
            id: '13',
            type: 'positive',
            name: "Juros sobre Capital (JCP) - BRDT3",
            amount: "R$85,09",
            category: "Ações",
            date: "29/09/2021"
        },
        {
            id: '14',
            type: 'positive',
            name: "Juros sobre Capital (JCP) - BBAS3",
            amount: "R$125,62",
            category: "Ações",
            date: "30/09/2021"
        },
        {
            id: '15',
            type: 'positive',
            name: "Dividendos - ITUB4",
            amount: "R$9,00",
            category: "Ações",
            date: "30/09/2021"
        },
        {
            id: '16',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,04",
            category: "Ações",
            date: "05/10/2021"
        },
        {
            id: '17',
            type: 'positive',
            name: "Juros sobre Capital (JCP) - POMO4",
            amount: "R$17,85",
            category: "Ações",
            date: "04/04/2022"
        },
        {
            id: '18',
            type: 'positive',
            name: "Dividendos - PORD11",
            amount: "R$51,87",
            category: "FIIs",
            date: "07/10/2021"
        },
        {
            id: '19',
            type: 'positive',
            name: "Aluguel (BTC) - VIIA3",
            amount: "R$0,54",
            category: "Ações",
            date: "07/10/2021"
        },
        {
            id: '20',
            type: 'positive',
            name: "Aluguel (BTC) - BRDT3",
            amount: "R$0,03",
            category: "Ações",
            date: "08/10/2021"
        },
        {
            id: '21',
            type: 'positive',
            name: "Dividendos - GGRC11",
            amount: "R$64,00",
            category: "FIIs",
            date: "08/10/2021"
        },
        {
            id: '22',
            type: 'positive',
            name: "Aluguel (BTC) - ABEV3",
            amount: "R$0,42",
            category: "Ações",
            date: "14/10/2021"
        },
    ];
    */
    

    function getLastTransactionDate(collection:DataListProps[], type: 'positive' | 'negative' | 'all') {
        let lastTransaction = new Date();
        if(type === 'all') {
            lastTransaction = new Date(
                Math.max.apply(Math, collection
                    .filter((transaction) => (transaction.type === 'positive' || transaction.type === 'negative'))
                    .map((transaction) => new Date(transaction.date).getTime())       
                )
            );
        } else {
            lastTransaction = new Date(
                Math.max.apply(Math, collection
                    .filter((transaction) => transaction.type === type)
                    .map((transaction) => new Date(transaction.date).getTime())       
                )
            );
        }

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }

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

        //setTransactions(data);

        const lastIncomeTransaction = getLastTransactionDate(transactions, 'positive');
        const lastExpenseTransaction = getLastTransactionDate(transactions, 'negative');
        const lastTransaction = getLastTransactionDate(transactions, 'all');

        const total = totalIncomes - totalExpenses;
       
        setHighlightData({
            incomes: {
                amount: totalIncomes.toLocaleString('pt-BR', { 
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastIncomeTransaction}`
            },
            expenses: {
                amount: totalExpenses.toLocaleString('pt-BR', { 
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastExpenseTransaction}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', { 
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `1 à ${lastTransaction}`
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
                            lastTransaction={highlightData.incomes.lastTransaction}
                        /> 
                        <HighlightCard 
                            title="Saídas"
                            type="down"
                            amount={highlightData.expenses.amount}
                            lastTransaction={highlightData.expenses.lastTransaction}
                        /> 
                        <HighlightCard 
                            title="Total"
                            type="total"
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction}
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