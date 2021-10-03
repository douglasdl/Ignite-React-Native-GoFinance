import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native';

import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

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
    total: number;
    formatedTotal: string;
    color: string;
    percent: string;
}

export function Summary() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey); 
        const formatedResponse = response ? JSON.parse(response) : [];

        const expenses = formatedResponse.filter((expense:TrasactionData) => expense.type === 'negative');

        const totalExpenses = expenses.reduce((accumulator:number, expense:TrasactionData) => {
            return accumulator + Number(expense.amount);
        },0);

        const totalByCategory:CategoryData[] = [];

        categories.forEach((category => {
            let categorySum = 0;

            expenses.forEach((expense:TrasactionData) => {
                if(expense.category === category.key) {
                    categorySum += Number(expense.amount);
                }
            });

            if(categorySum > 0) {
                const formatedTotal = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = `${(categorySum / totalExpenses * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    color: category.color,
                    formatedTotal,
                    percent,
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
                <ChartContainer>
                    <VictoryPie 
                        data={totalByCategories}
                        x="percent"
                        y="total"
                        colorScale={totalByCategories.map((category) => category.color)}
                        style={{
                            labels: { 
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape,
                            }
                        }}
                        labelRadius={50}
                    />
                </ChartContainer>
                {
                    totalByCategories.map(item => (
                        <HistoryCard 
                            key={item.key}
                            title={item.name}
                            amount={item.formatedTotal}
                            color={item.color}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}