import { Container } from '@mantine/core';
import styles from './MainContainer.module.css';

export const MainContainer = ({ children }) => (
  <Container size="xl" className={styles.container}>
    {children}
  </Container>
);
