const InputComponent = ({
	type = 'text',
	name,
	id = name,
	placeholder,
	error,
	register,
	classNameError,
	onClick,
}) => {
	return (
		<>
			<input
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				{...register(name)}
				onClick={onClick}
			/>
			{error && <span className={classNameError}>{error.message}</span>}
		</>
	);
};

export default InputComponent;
