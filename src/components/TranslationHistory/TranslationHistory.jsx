import { ActionIcon, Card, Drawer, Flex, Stack, Text, Title, Tooltip } from '@mantine/core';
import { TbTrashFilled } from 'react-icons/tb';

export const TranslationHistoryDrawer = ({ opened, close, onClear, history }) => (
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
            <ActionIcon color="red" size="30px" variant="subtle" onClick={onClear}>
              <TbTrashFilled size="20px" />
            </ActionIcon>
          </Tooltip>
          <Drawer.CloseButton />
        </div>
      </Drawer.Header>

      <Drawer.Body>
        <Flex direction="column" gap="sm">
          {history.map((item, index) => (
            <Card key={index} padding="lg" shadow="sm" radius="md" withBorder>
              <Flex justify="space-between">
                <Stack gap={3} padding="lg">
                  <Title size="h4">{item.query}</Title>
                  <Text>{item.translatedText}</Text>
                </Stack>
                <Text color="dimmed">{item.tranlatedAt}</Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);
