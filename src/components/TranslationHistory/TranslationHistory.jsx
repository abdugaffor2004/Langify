import { ActionIcon, Card, Drawer, Flex, Grid, Stack, Text, Title, Tooltip } from '@mantine/core';
import { TbTrashFilled } from 'react-icons/tb';

const formatDate = dateString => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toLocaleDateString() === today.toLocaleDateString();
  const isYesterday = date.toLocaleDateString() === yesterday.toLocaleDateString();

  if (isToday) {
    return 'Today';
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

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
              <Card padding="lg" shadow="sm" radius="md" withBorder>
                <Flex justify={'space-between'}>
                  <Stack gap={3} padding="lg">
                    <Title size="h4">{item.query}</Title>
                    <Text>{item.translatedText}</Text>
                  </Stack>
                  <Text color="dimmed">{formatDate(item.date)}</Text>
                </Flex>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);
