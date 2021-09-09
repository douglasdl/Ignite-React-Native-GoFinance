import React, { useState } from "react";
import { Modal } from 'react-native';
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../../screens/CategorySelect";

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes, 
} from "./styles";

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="Preço"
                    />
                    
                    <TransactionTypes>
                        <TransactionTypeButton 
                            type='up'
                            title='Entrada'
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        
                        <TransactionTypeButton 
                            type='down'
                            title='Despesa'
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                        
                    </TransactionTypes>

                    <CategorySelectButton 
                        title={category.name} 
                        onPress={handleOpenSelectCategoryModal}
                    />

                </Fields>

                <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={ handleCloseSelectCategoryModal }
                />
            </Modal>
        </Container>
    );
}