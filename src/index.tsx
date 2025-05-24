import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const togglePanel = () => setIsPanelOpen((prev) => !prev);

	const handleFormChange = (newState: ArticleStateType) => {
		setFormState(newState);
	};

	const applyChanges = () => {
		setArticleState(formState);
		togglePanel();
	};

	const resetChanges = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const styleVariables = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={styleVariables}>
			<ArticleParamsForm
				isOpen={isPanelOpen}
				onToggle={togglePanel}
				onFormChange={handleFormChange}
				onApply={applyChanges}
				onReset={resetChanges}
				currentState={formState}
			/>
			<Article />
		</main>
	);
};

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
