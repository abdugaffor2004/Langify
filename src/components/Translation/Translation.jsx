import { Grid, Textarea, Tooltip, ActionIcon } from '@mantine/core';
import { useCallback } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import { LangSelect } from '../LangSelect';
import {
  TbArrowsLeftRight,
  TbCopy,
  TbCopyCheckFilled,
  TbLanguage,
  TbHistory,
} from 'react-icons/tb';
import styles from './Translation.module.css';
import { useClipboard, useDisclosure, useLocalStorage } from '@mantine/hooks';
import { ErrorAlert } from '../ErrorAlert';
import { TranslationHistoryDrawer } from '../TranslationHistoryDrawer';
import { useTranslation } from '../../hooks/useTranslation';

const LS_TRANSLATION = 'translations';

export const Translation = () => {
  const {
    state,
    handleTranslation,
    handleInputChange,
    handleLangsSwap,
    handleSourceChange,
    handleTargetChange,
  } = useTranslation();
  const trimmedQuery = state.query?.trim();
  const clipboard = useClipboard({ timeout: 1200 });
  const [opened, { open, close }] = useDisclosure(false);
  const [history, setHistory, clearHistory] = useLocalStorage({
    key: LS_TRANSLATION,
    defaultValue: [],
    deserialize: rawHistory => {
      try {
        return JSON.parse(rawHistory).map(historyEntry => ({
          ...historyEntry,
          tranlatedAt: new Date(historyEntry.tranlatedAt),
        }));
      } catch (error) {
        console.error('Error deserializing history:', error);
        return [];
      }
    },
  });
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: () =>
      translate(trimmedQuery, {
        to: state.target,
        from: state.source,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess: data => {
      const {
        text,
        from: {
          language: { iso },
        },
      } = data;

      handleTranslation(text, iso);

      setHistory(prevHistory => [
        {
          query: state.query,
          translatedText: text,
          tranlatedAt: new Date(),
        },
        ...prevHistory,
      ]);
    },
  });

  const handleMutation = useCallback(() => {
    if (trimmedQuery === '') {
      throw new Error(
        'There is no input value, please provide some meaningful data for translation',
      );
    }
    mutate();
  }, [trimmedQuery, mutate]);

  const handleHistoryClear = () => {
    clearHistory();
    close();
  };

  const handleTranslationCopy = () => {
    clipboard.copy(state.translatedText);
  };

  return (
    <>
      <TranslationHistoryDrawer
        opened={opened}
        onClose={close}
        onClear={handleHistoryClear}
        history={history}
      />

      <Grid className={styles.gridContainer}>
        <Grid.Col p={0} span={5}>
          <LangSelect
            detectedLang={state.detectedSource}
            withAuto
            value={state.source}
            onChange={handleSourceChange}
          />
          <Textarea
            placeholder="Text"
            className={styles.textarea}
            value={state.query}
            onChange={handleInputChange}
            autosize
            size="lg"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col className={styles.middleActions} span={2}>
          <Tooltip label="swap the languages" transitionProps={{ duration: 350 }} offset={10}>
            <ActionIcon
              size="38px"
              disabled={state.source === 'auto' && !state.detectedSource}
              onClick={handleLangsSwap}
              className={styles.swapButton}
            >
              <TbArrowsLeftRight size="20px" />
            </ActionIcon>
          </Tooltip>

          <div className={styles.translationActions}>
            <Tooltip label="Translate" transitionProps={{ duration: 350 }} offset={10}>
              <ActionIcon
                onClick={handleMutation}
                size="lg"
                disabled={!trimmedQuery}
                loading={isPending}
                className={styles.translateButton}
              >
                <TbLanguage size="24px" />
              </ActionIcon>
            </Tooltip>

            <Tooltip
              label="History"
              position="bottom"
              transitionProps={{ duration: 350 }}
              offset={10}
            >
              <ActionIcon onClick={open} size="lg" className={styles.historyButton}>
                <TbHistory size="24px" />
              </ActionIcon>
            </Tooltip>
          </div>
        </Grid.Col>

        <Grid.Col p={0} span={5}>
          <LangSelect value={state.target} onChange={handleTargetChange} />
          <div className={styles.translationContainer}>
            <Textarea
              placeholder="Translation"
              className={styles.textarea}
              value={state.translatedText}
              autosize
              size="lg"
              minRows={8}
              readOnly
            />

            <Tooltip
              disabled={!state.translatedText}
              label={clipboard.copied ? 'Copied' : 'Copy'}
              position="right"
            >
              <ActionIcon
                className={styles.copyButton}
                disabled={!state.translatedText}
                color={clipboard.copied ? 'teal' : 'blue'}
                size="32px"
                variant="subtle"
                onClick={handleTranslationCopy}
              >
                {clipboard.copied ? <TbCopyCheckFilled size="24px" /> : <TbCopy size="24px" />}
              </ActionIcon>
            </Tooltip>
          </div>

          {isError && <ErrorAlert error={error} />}
          {clipboard.error && <ErrorAlert error={clipboard.error} />}
        </Grid.Col>
      </Grid>
    </>
  );
};
