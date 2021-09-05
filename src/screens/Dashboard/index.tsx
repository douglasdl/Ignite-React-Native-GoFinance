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
                <HighlightCard /> 
                <HighlightCard /> 
                <HighlightCard /> 
            </HighlightCards>
        </Container>
    );
}