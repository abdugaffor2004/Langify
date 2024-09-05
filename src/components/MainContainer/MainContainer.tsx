import { Container } from '@mantine/core';
import styles from './MainContainer.module.css';
import { FC, ReactNode } from 'react';

interface IMainContainerProps {
  children: ReactNode;
}

export const MainContainer: FC<IMainContainerProps> = ({ children }) => (
  <Container size="xl" className={styles.container}>
    {children}
  </Container>
);
