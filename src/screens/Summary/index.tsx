import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import { 
    Container,
    Header,
    Title,
    Content,
} from "./styles";

interface TrasactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: String;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Summary() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey); 
        const formatedResponse = response ? JSON.parse(response) : [];

        const expenses = formatedResponse.filter((expense:TrasactionData) => expense.type === 'negative');

        const totalByCategory:CategoryData[] = [];

        categories.forEach((category => {
            let categorySum = 0;

            expenses.forEach((expense:TrasactionData) => {
                if(expense.category === category.key) {
                    categorySum += Number(expense.amount);
                }
            });

            if(categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total,
                    color: category.color,
                });
            }
            
        }))

        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData()
    },[]);
    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            <Content>
                {
                    totalByCategories.map(item => (
                        <HistoryCard 
                            key={item.key}
                            title={item.name}
                            amount={item.total}
                            color={item.color}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}