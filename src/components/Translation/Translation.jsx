import { Grid, Textarea, Tooltip, ActionIcon } from '@mantine/core';
import { useCallback } from 'react';
import { LangSelect } from '../LangSelect';
import {
  TbArrowsLeftRight,
  TbCopy,
  TbCopyCheckFilled,
  TbLanguage,
  TbHistory,
} from 'react-icons/tb';
import styles from './Translation.module.css';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { ErrorAlert } from '../ErrorAlert';
import { TranslationHistoryDrawer } from '../TranslationHistoryDrawer';
import { useTranslation } from './useTranslation';
import { useTranslateHistoryStorage } from '../../hooks/useTranslateHistoryStorage';
import { useTranslateMutation } from '../../hooks/useTranslateMutation';

export const Translation = () => {
  const {
    query,
    trimmedQuery,
    translatedText,
    target,
    source,
    detectedSource,
    translate: translateTranslation,
    setQuery,
    setSource,
    setTarget,
    swapLanguages,
  } = useTranslation();
  const { history, clearHistory, setHistory } = useTranslateHistoryStorage();
  const [opened, { open, close }] = useDisclosure(false);

  const { error, isError, isPending, mutate } = useTranslateMutation({
    onSuccess: ({
      text,
      from: {
        language: { iso },
        text: { value },
      },
    }) => {
      translateTranslation(text, iso);
      setHistory(prevHistory => [
        {
          query: value,
          translatedText: text,
          translatedAt: new Date(),
        },
        ...prevHistory,
      ]);
    },
  });

  const clipboard = useClipboard({ timeout: 1200 });

  const handleTranslate = useCallback(() => {
    if (trimmedQuery === '') {
      throw new Error(
        'There is no input value, please provide some meaningful data for translation',
      );
    }
    mutate({ text: trimmedQuery, from: source, to: target });
  }, [trimmedQuery, mutate, source, target]);

  const handleHistoryClear = () => {
    clearHistory();
    close();
  };

  const handleTranslationCopy = () => {
    clipboard.copy(translatedText);
  };

  const handleInputChange = event => {
    setQuery(event.currentTarget.value);
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
          <LangSelect detectedLang={detectedSource} withAuto value={source} onChange={setSource} />
          <Textarea
            placeholder="Text"
            className={styles.textarea}
            value={query}
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
              disabled={source === 'auto' && !detectedSource}
              onClick={swapLanguages}
              className={styles.swapButton}
            >
              <TbArrowsLeftRight size="20px" />
            </ActionIcon>
          </Tooltip>

          <div className={styles.translationActions}>
            <Tooltip label="Translate" transitionProps={{ duration: 350 }} offset={10}>
              <ActionIcon
                onClick={handleTranslate}
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
          <LangSelect value={target} onChange={setTarget} />
          <div className={styles.translationContainer}>
            <Textarea
              placeholder="Translation"
              className={styles.textarea}
              value={translatedText}
              autosize
              size="lg"
              minRows={8}
              readOnly
            />

            <Tooltip
              disabled={!translatedText}
              label={clipboard.copied ? 'Copied' : 'Copy'}
              position="right"
            >
              <ActionIcon
                className={styles.copyButton}
                disabled={!translatedText}
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
