import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleParams, OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type DefaultAppProps = {
	defaultArticleProps: ArticleParams
};

const App = (props: DefaultAppProps) => {
	const { defaultArticleProps } = props;
	const [articleParams, setArticleParams] = useState<ArticleParams>(defaultArticleProps);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={false}
				defaultArticleState={defaultArticleProps}
				initialSelected={articleParams}
				onResetBtnClick={() => {
					setArticleParams({ ...defaultArticleProps });
				}}
				onSubmitBtnClick={(selected: ArticleParams) => {
					setArticleParams({ ...selected });
				}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App defaultArticleProps={defaultArticleState} />
	</StrictMode>
);
