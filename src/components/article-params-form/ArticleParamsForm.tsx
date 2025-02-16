import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = () => {
		setIsOpen((currentValue) => !currentValue);
	};

	const paramsPanel = useRef<HTMLFormElement | null>(null);
	const nonFirstClick = useRef<boolean | null>(false)

	useEffect(() => {
		const handleOutsideClick = (evt: Event) => {
			if (
				evt.target instanceof Node &&
				!paramsPanel.current?.contains(evt.target) &&
				nonFirstClick.current
			) {
				setIsOpen(false);
			}
			nonFirstClick.current = true;
			evt.stopPropagation();
		};

		if (isOpen) {
			nonFirstClick.current = false;
			window.addEventListener('click', handleOutsideClick);
		}

		return () => {
			 window.removeEventListener('click', handleOutsideClick);
		}
	});

	const containerClasses = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside className={containerClasses}>
				<form ref={paramsPanel} className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
