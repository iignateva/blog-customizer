import { CSSProperties, useState } from 'react';
import { ArticleParams, defaultArticleState } from 'src/constants/articleProps';
import styles from './App.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleParams>(defaultArticleState);

	return (
		<main
			className={styles.main}
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
				initialSelected={articleParams}
				updateArticleState={setArticleParams}
			/>
			<Article />
		</main>
	);
};
