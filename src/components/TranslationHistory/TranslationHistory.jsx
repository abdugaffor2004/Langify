import { ActionIcon, Card, Drawer, Grid, Stack, Text, Title, Tooltip } from '@mantine/core';
import { TbTrashFilled } from 'react-icons/tb';

export const TranslationHistory = ({ opened, close, handleHistoryClear, history }) => (
  <Drawer.Root
    position="right"
    offset={8}
    radius="md"
    withCloseButton={false}
    opened={opened}
    onClose={close}
  >
    <Drawer.Overlay />
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>{!history.length ? 'History (is empty now)' : 'History'}</Drawer.Title>
        <div>
          <Tooltip label="delete" position="bottom">
            <ActionIcon color="red" size="30px" variant="subtle" onClick={handleHistoryClear}>
              <TbTrashFilled size="20px" />
            </ActionIcon>
          </Tooltip>
          <Drawer.CloseButton />
        </div>
      </Drawer.Header>

      <Drawer.Body>
        <Grid gutter={'lg'} grow>
          {history.map((item, index) => (
            <Grid.Col key={index} span={'content'}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap={3}>
                  <Title size="h4">{item.query}</Title>
                  <Text>{item.translatedText}</Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);
