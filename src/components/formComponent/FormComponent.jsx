import ButtonComponent from '../buttonComponent/index.js';
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
			.refine((files) => files?.length > 0, {
				message: 'Musisz dodać swoje cv',
			})
			.refine(
				(files) =>
					files?.length > 0 &&
					(files[0].type === 'image/jpeg' || files[0].type === 'image/png'),
				{ message: 'Wymagany format pliku to png lub jpg' }
			),
	});

const FormComponent = ({ setIsFormSubmitted, setModalImg, setUserData, className }) => {
	const [isExperienceChecked, setIsExperienceChecked] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(formSchema(isExperienceChecked)),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'experience',
	});

	const isCvAdded = watch('cv');

	const onSubmit = (data) => {
		const fileURL = URL.createObjectURL(isCvAdded[0]);
		setIsFormSubmitted(true);
		setModalImg(fileURL);
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
				<div>
					<h2>Dane osobowe</h2>
					<input
						type='text'
						id='firstName'
						name='firstName'
						placeholder='Imię'
						{...register('firstName')}
					/>
					{errors.firstName && (
						<span className={style.error}>{errors.firstName.message}</span>
					)}
					<input
						type='text'
						id='lastName'
						name='lastName'
						placeholder='Nazwisko'
						{...register('lastName')}
					/>
					{errors.lastName && (
						<span className={style.error}>{errors.lastName.message}</span>
					)}
					<input
						type='text'
						id='email'
						name='email'
						placeholder='E-mail'
						{...register('email')}
					/>
					{errors.email && (
						<span className={style.error}>{errors.email.message}</span>
					)}
					<input
						type='number'
						id='phoneNumber'
						name='phoneNumber'
						placeholder='Numer telefonu'
						{...register('phoneNumber')}
					/>
					{errors.phoneNumber && (
						<span className={style.error}>{errors.phoneNumber.message}</span>
					)}
				</div>
				<div>
					<h2>Preferencje Kursu</h2>
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

					<select
						className={style.select_pref_tech}
						size={5}
						multiple
						{...register('prefTechnology')}
					>
						<option value='React'>React</option>
						<option value='Node.js'>Node.js</option>
						<option value='CSS'>CSS</option>
						<option value='HTML'>HTML</option>
						<option value='Next.js'>Next.js</option>
					</select>
					{errors.prefTechnology && (
						<span className={style.error}>{errors.prefTechnology.message}</span>
					)}
				</div>

				<div>
					<h2>Dodaj swoje CV</h2>
					<input
						type='file'
						name='cv'
						id='cv'
						accept='image/jpeg, image/png'
						{...register('cv', { required: true })}
					/>
				</div>
				{errors.cv && <span className={style.error}>{errors.cv.message}</span>}

				<div>
					<h2>Doświadczenie w programowaniu</h2>
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
										<select
											{...register(`experience.${index}.expTechnology`, {
												required: isExperienceChecked
													? 'Wybierz technologię'
													: false,
											})}
										>
											<option value='JavaScript'>JavaScript</option>
											<option value='Java'>Java</option>
											<option value='Python'>Python</option>
										</select>

										<select
											{...register(`experience.${index}.yearsOfExperience`, {
												required: isExperienceChecked
													? 'Wybierz lata doświadczenia'
													: false,
											})}
										>
											<option value='1'>1</option>
											<option value='2'>2</option>
											<option value='3'>3</option>
											<option value='4'>4</option>
											<option value='5'>5</option>
										</select>

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
				</div>
				<ButtonComponent
					type='submit'
					text='Wyślij zgłoszenie'
				/>
			</form>
		</>
	);
};

export default FormComponent;
