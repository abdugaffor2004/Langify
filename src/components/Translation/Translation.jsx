import { Container, Grid, Textarea, Tooltip, ActionIcon } from '@mantine/core';
import { useCallback, useEffect, useReducer } from 'react';
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
import {
  INITIAL_TRANSLATION_STATE,
  translationReducer,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  TRANSLATE_ACTION_TYPE,
} from './reducer';
import { useClipboard, useDisclosure, useLocalStorage } from '@mantine/hooks';
import { ErrorAlert } from './ErrorAlert';
import { readSessionStorageValue, writeSessionStorageValue } from '../../lib/storage/';
import { TranslationHistoryDrawer } from '../TranslationHistoryDrawer';

const SS_TRANSLATION = 'languages';
const LS_TRANSLATION = 'translations';
const createTranslationInitialState = initialState => ({
  ...initialState,
  ...readSessionStorageValue(SS_TRANSLATION),
});

export const Translation = () => {
  const [state, dispatch] = useReducer(
    translationReducer,
    INITIAL_TRANSLATION_STATE,
    createTranslationInitialState,
  );

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
          text: { value },
        },
      } = data;

      dispatch({
        type: TRANSLATE_ACTION_TYPE,
        payload: {
          text,
          language: iso,
        },
      });

      setHistory(prevHistory => [
        {
          query: value,
          translatedText: text,
          tranlatedAt: new Date(),
        },
        ...prevHistory,
      ]);
    },
  });

  const handleTranslate = useCallback(() => {
    if (trimmedQuery === '') {
      throw new Error(
        'There is no input value, please provide some meaningful data for translation',
      );
    }
    mutate();
  }, [trimmedQuery, mutate]);

  const handleInputChange = event => {
    dispatch({ type: SET_QUERY_ACTION_TYPE, payload: event.currentTarget.value });
  };

  const handleSourceChange = value => {
    dispatch({ type: SET_SOURCE_ACTION_TYPE, payload: value });
  };

  const handleTargetChange = value => {
    dispatch({ type: SET_TARGET_ACTION_TYPE, payload: value });
  };

  const handleLangsSwap = () => {
    dispatch({ type: SWAP_LANGUAGES_ACTION_TYPE });
  };

  const handleHistoryClear = () => {
    clearHistory();
    close();
  };

  const handleTranslationCopy = () => {
    clipboard.copy(state.translatedText);
  };

  useEffect(() => {
    writeSessionStorageValue(SS_TRANSLATION, {
      source: state.source,
      target: state.target,
    });
  }, [state.source, state.target]);

  return (
    <Container size="xl" className={styles.container}>
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
    </Container>
  );
};
