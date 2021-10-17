import React, { useContext } from 'react';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterContainer
} from "./styles";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { AuthContext } from '../../AuthContext';

export function SignIn() {
    const data = useContext(AuthContext);
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                    <SignInTitle>
                        Faça seu login com {'\n'} 
                        uma das contas abaixo
                    </SignInTitle>
                </TitleWrapper>
            </Header>
            <Footer>
                <FooterContainer>
                    <SignInSocialButton 
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                    <SignInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                    />
                </FooterContainer>
            </Footer>
        </Container>
    );
}