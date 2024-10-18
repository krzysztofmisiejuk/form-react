import style from './FormSectionComponent.module.css';

const FormSectionComponent = ({ children, headerText }) => {
	return (
		<>
			<div className={style.form_section}>
				<h2>{headerText}</h2>
				{children}
			</div>
		</>
	);
};

export default FormSectionComponent;
