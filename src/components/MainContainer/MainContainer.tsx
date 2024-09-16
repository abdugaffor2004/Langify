import { Container } from '@mantine/core';
import styles from './MainContainer.module.css';
import { FC, ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

export const MainContainer: FC<MainContainerProps> = ({ children }) => (
  <Container size="xl" className={styles.container}>
    {children}
  </Container>
);
