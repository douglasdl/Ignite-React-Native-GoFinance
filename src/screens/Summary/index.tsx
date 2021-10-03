import React from "react";
import { HistoryCard } from "../../components/HistoryCard";

import { 
    Container,
    Header,
    Title,
} from "./styles";

export function Summary() {
    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            <HistoryCard 
                title="Compras"
                amount="R$100,00"
                color={"#ff0000"}
            />
            <HistoryCard 
                title="Compras"
                amount="R$100,00"
                color={"#ff0000"}
            />
            <HistoryCard 
                title="Compras"
                amount="R$100,00"
                color={"#ff0000"}
            />
            <HistoryCard 
                title="Compras"
                amount="R$100,00"
                color={"#ff0000"}
            />
        </Container>
    );
}