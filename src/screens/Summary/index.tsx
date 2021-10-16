import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,

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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    function handleDateChange(action: 'next' | 'prev') {
        let newDate = new Date();
        if(action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
            
        }
    }

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey); 
        const formatedResponse = response ? JSON.parse(response) : [];

        const expenses = formatedResponse.filter((expense:TrasactionData) => 
            expense.type === 'negative' && 
            new Date(expense.date).getMonth() === selectedDate.getMonth() &&
            new Date(expense.date).getFullYear() === selectedDate.getFullYear()    
        );

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
    },[selectedDate]);
    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            <Content
                contentContainerStyle={{ 
                    paddingHorizontal: 24, 
                    paddingBottom: useBottomTabBarHeight(),
                }}
                showsVerticalScrollIndicator={false}
            >
                <MonthSelect>
                    <MonthSelectButton
                        onPress={() => handleDateChange('prev')}
                    >
                        <MonthSelectIcon 
                            name="chevron-left"
                        />
                    </MonthSelectButton>

                    <Month>
                        { format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }
                    </Month>

                    <MonthSelectButton
                        onPress={() => handleDateChange('next')}
                    >
                        <MonthSelectIcon 
                            name="chevron-right"
                        />
                    </MonthSelectButton> 
                </MonthSelect>

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
                        innerRadius={0}
                        startAngle={0}
                        padAngle={1}
                        radius={150}
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