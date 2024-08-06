import { ActionIcon, Card, Drawer, Flex, Text, Title, Tooltip } from '@mantine/core';
import { TbTrashFilled, TbArrowNarrowRight, TbArrowNarrowDown } from 'react-icons/tb';

export const TranslationHistoryDrawer = ({ opened, onClose, onClear, history }) => (
  <Drawer.Root
    position="right"
    offset={8}
    radius="md"
    withCloseButton={false}
    opened={opened}
    onClose={onClose}
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
            <Card key={index} padding="lg" pt="10px" shadow="sm" radius="md" withBorder>
              <Flex justify="flex-end" pb="5px">
                <Text color="dimmed">{item.tranlatedAt.toLocaleDateString()}</Text>
              </Flex>

              <Flex
                justify={item.query.length > 20 && 'center'}
                wrap="wrap"
                align="center"
                gap="xs"
              >
                <Title size="h4">{item.query}</Title>
                {item.query.length > 20 ? (
                  <TbArrowNarrowDown size="24px" />
                ) : (
                  <TbArrowNarrowRight size="20px" />
                )}
                <Title c="dimmed" size="h4">
                  {item.translatedText}
                </Title>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);
