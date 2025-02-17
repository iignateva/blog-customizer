import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { ArticleParams, OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	isOpen: boolean;
	defaultArticleState: ArticleParams;
	initialSelected: ArticleParams;
	onResetBtnClick?: () => void;
	onSubmitBtnClick?: (selected: ArticleParams) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(props.isOpen);
	const [select, setSelect] = useState(props.initialSelected)

	const toggleIsOpen = () => {
		setIsOpen((currentValue) => !currentValue);
	};

	const paramsPanel = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: false,
		rootRef: paramsPanel,
		onChange: () => {}
	});

	const containerClasses = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<div ref={paramsPanel}>
				<aside className={containerClasses}>
					<form className={styles.form}>
						<div className={styles.label}>задайте параметры</div>
						<div className={styles.parameters}>
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
						</div>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={() => {
									props.onResetBtnClick?.();
									setSelect(props.defaultArticleState);
									setIsOpen(false);
								}}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={(evt: SyntheticEvent) => {
									evt.preventDefault();
									props.onSubmitBtnClick?.({ ...select });
									setIsOpen(false);
								}}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
