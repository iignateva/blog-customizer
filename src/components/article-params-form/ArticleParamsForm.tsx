import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleParams,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	initialSelected: ArticleParams;
	updateArticleState: (selected: ArticleParams) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { initialSelected, updateArticleState } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [select, setSelect] = useState(initialSelected);

	const toggleIsOpen = () => {
		setIsOpen((currentValue) => !currentValue);
	};

	const paramsPanel = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: paramsPanel,
		onChange: setIsOpen,
	});

	const onFormReset = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setSelect(defaultArticleState);
		updateArticleState(defaultArticleState);
		setIsOpen(false);
	};
	const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		updateArticleState(select);
		setIsOpen(false);
	};

	const containerClasses = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<div ref={paramsPanel}>
				<aside className={containerClasses}>
					<form
						className={styles.form}
						onSubmit={onFormSubmit}
						onReset={onFormReset}>
						<Text as='h2' weight={800} size={31} uppercase={true}>
							задайте параметры
						</Text>
						<Select
							selected={select.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={(selected: OptionType) => {
								setSelect({ ...select, fontFamilyOption: selected });
							}}
						/>
						<RadioGroup
							name='font_color'
							selected={select.fontSizeOption}
							options={fontSizeOptions}
							title='размер шрифта'
							onChange={(selected: OptionType) => {
								setSelect({ ...select, fontSizeOption: selected });
							}}
						/>
						<Select
							selected={select.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={(selected: OptionType) => {
								setSelect({ ...select, fontColor: selected });
							}}
						/>
						<Separator></Separator>
						<Select
							selected={select.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={(selected: OptionType) => {
								setSelect({ ...select, backgroundColor: selected });
							}}
						/>
						<Select
							selected={select.contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={(selected: OptionType) => {
								setSelect({ ...select, contentWidth: selected });
							}}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
