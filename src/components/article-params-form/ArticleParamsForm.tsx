import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onFormChange: (state: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
	currentState: ArticleStateType;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onFormChange,
	onApply,
	onReset,
	currentState,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onToggle]);

	const handleSelectChange = (key: keyof ArticleStateType, value: unknown) => {
		onFormChange({
			...currentState,
			[key]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={currentState.fontFamilyOption}
						onChange={(option) =>
							handleSelectChange('fontFamilyOption', option)
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={currentState.fontSizeOption}
						onChange={(option) => handleSelectChange('fontSizeOption', option)}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentState.fontColor}
						onChange={(option) => handleSelectChange('fontColor', option)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentState.backgroundColor}
						onChange={(option) => handleSelectChange('backgroundColor', option)}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentState.contentWidth}
						onChange={(option) => handleSelectChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='clear'
							onClick={onReset}
							htmlType='reset'
						/>
						<Button
							title='Применить'
							type='apply'
							onClick={onApply}
							htmlType='submit'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
