import {
	ButtonComponent,
	FormSectionComponent,
	InputComponent,
	SelectComponent,
} from '../index';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import * as z from 'zod';
import style from './FormComponent.module.css';

const formSchema = (isExperienceChecked) =>
	z.object({
		firstName: z
			.string()
			.min(1, { message: 'Imię jest wymagane' })
			.min(3, { message: 'Imię musi mieć przynajmniej 3 znaki' }),
		lastName: z
			.string()
			.min(1, { message: 'Nazwisko jest wymagane' })
			.min(3, { message: 'Nazwisko musi mieć przynajmniej 3 znaki' }),
		email: z
			.string()
			.min(1, { message: 'E-mail jest wymagany' })
			.email({ message: 'Podaj poprawny adres e-mail' }),
		phoneNumber: z
			.string()
			.min(1, { message: 'Numer telefonu jest wymagany' })
			.min(9, { message: 'Zbyt krótki numer telefonu' }),
		preferences: z.enum(['stacjonarny', 'online'], {
			message: 'Musisz wybrać formę nauki',
		}),
		prefTechnology: z
			.array(z.enum(['React', 'Node.js', 'CSS', 'HTML', 'Next.js']), {
				message: 'Musisz wybrać preferowaną technologię',
			})
			.nonempty({ message: 'Musisz wybrać przynajmniej jedną technologię' }),
		experience: isExperienceChecked
			? z
					.array(
						z.object({
							expTechnology: z.enum(['JavaScript', 'Java', 'Python'], {
								message: 'Wybierz technologię',
							}),
							yearsOfExperience: z.enum(['1', '2', '3', '4', '5'], {
								message: 'Wybierz lata doświadczenia',
							}),
						})
					)
					.nonempty({ message: 'Uzupełnij dane dotyczące doświadczenia.' })
			: z.array(
					z.object({
						expTechnology: z
							.enum(['JavaScript', 'Java', 'Python'], {
								message: 'Wybierz technologię',
							})
							.optional(),
						yearsOfExperience: z
							.enum(['1', '2', '3', '4', '5'], {
								message: 'Wybierz lata doświadczenia',
							})
							.optional(),
					})
			  ),
		cv: z
			.instanceof(FileList)
			.refine((files) => files.length === 1, {
				message: 'Musisz dodać swoje CV',
			})
			.refine(
				(files) => {
					const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
					return validTypes.includes(files[0]?.type);
				},
				{
					message: 'Wymagany format pliku to JPG lub PNG',
				}
			),
	});

const FormComponent = ({
	setIsFormSubmitted,
	setUserCv,
	setUserData,
	className,
}) => {
	const [isExperienceChecked, setIsExperienceChecked] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(formSchema(isExperienceChecked)),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'experience',
	});

	const onSubmit = (data) => {
		setIsFormSubmitted(true);
		setUserCv(URL.createObjectURL(data.cv[0]));
		setUserData(data);
		reset();
	};

	return (
		<>
			<h1>Formularz zgłoszeniowy na kurs programowania</h1>
			<form
				className={className}
				onSubmit={handleSubmit(onSubmit)}
				encType='multipart/form-data'
			>
				<FormSectionComponent headerText='Dane osobowe'>
					<InputComponent
						name='firstName'
						placeholder='Imię'
						register={register}
						classNameError={style.error}
						error={errors.firstName}
					/>
					<InputComponent
						name='lastName'
						placeholder='Nazwisko'
						register={register}
						classNameError={style.error}
						error={errors.lastName}
					/>
					<InputComponent
						name='email'
						placeholder='E-mail'
						register={register}
						classNameError={style.error}
						error={errors.email}
					/>
					<InputComponent
						type='number'
						name='phoneNumber'
						placeholder='Numer telefonu'
						register={register}
						error={errors.phoneNumber}
						classNameError={style.error}
					/>
				</FormSectionComponent>
				<FormSectionComponent headerText='Preferencje Kursu'>
					<div className={style.row}>
						<p>Wybierz formę nauki:</p>
						<div>
							<input
								type='radio'
								name='preferences'
								value='stacjonarny'
								id='stationary'
								{...register('preferences')}
								defaultChecked
							/>
							<label htmlFor='stationary'>Stacjonarne</label>
						</div>
						<div>
							<input
								type='radio'
								name='preferences'
								value='online'
								id='online'
								{...register('preferences')}
							/>
							<label htmlFor='online'>Online</label>
						</div>
					</div>
					<SelectComponent
						name='prefTechnology'
						className={style.select_pref_tech}
						size={5}
						multiple
						register={register}
						options={[
							{ value: 'React', text: 'React' },
							{ value: 'Node.js', text: 'Node.js' },
							{ value: 'CSS', text: 'CSS' },
							{ value: 'HTML', text: 'HTML' },
							{ value: 'Next.js', text: 'Next.js' },
						]}
					/>
					{errors.prefTechnology && (
						<span className={style.error}>{errors.prefTechnology.message}</span>
					)}
				</FormSectionComponent>
				<FormSectionComponent headerText='Dodaj swoje CV'>
					<InputComponent
						type='file'
						name='cv'
						register={register}
						error={errors.cv}
						classNameError={style.error}
					/>
				</FormSectionComponent>
				<FormSectionComponent headerText='Doświadczenie w programowaniu'>
					<div className={style.row}>
						<input
							type='checkbox'
							id='experience'
							name='experienceCheckbox'
							onClick={() => {
								setIsExperienceChecked(!isExperienceChecked);
							}}
						/>
						<label htmlFor='experience'>
							Czy masz doświadczenie w programowaniu?
						</label>
					</div>

					{isExperienceChecked && (
						<>
							<ButtonComponent
								text='Dodaj doświadczenie'
								className={style.add_exp_button}
								onClick={(e) => {
									e.preventDefault();
									append({
										expTechnology: '',
										yearsOfExperience: '',
									});
								}}
							/>

							{isExperienceChecked && errors?.experience && (
								<span className={style.error}>
									{errors?.experience?.message}
								</span>
							)}

							{fields.map((field, index) => (
								<>
									<div
										key={field.id}
										className={style.add_exp_box}
									>
										<SelectComponent
											name={`experience.${index}.expTechnology`}
											register={register}
											options={[
												{ value: 'JavaScript', text: 'JavaScript' },
												{ value: 'Java', text: 'Java' },
												{ value: 'Python', text: 'Python' },
											]}
										/>
										<SelectComponent
											name={`experience.${index}.yearsOfExperience`}
											register={register}
											options={[
												{ value: '1', text: '1' },
												{ value: '2', text: '2' },
												{ value: '3', text: '3' },
												{ value: '4', text: '4' },
												{ value: '5', text: '5' },
											]}
										/>
										<ButtonComponent
											text='Usuń'
											className={style.delete_exp_button}
											onClick={() => remove(index)}
										/>
									</div>
									{isExperienceChecked &&
										(errors.experience?.[index]?.expTechnology ||
											errors.experience?.[index]?.yearsOfExperience) && (
											<span className={style.error}>
												Uzupełnij dane dotyczące doświadczenia
											</span>
										)}
								</>
							))}
						</>
					)}
				</FormSectionComponent>
				<ButtonComponent
					type='submit'
					text='Wyślij zgłoszenie'
				/>
			</form>
		</>
	);
};

export default FormComponent;
