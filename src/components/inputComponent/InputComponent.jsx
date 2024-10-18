const InputComponent = ({
	type = 'text',
	name,
	id = name,
	placeholder,
	error,
	value,
	register,
	classNameError,
	onClick,
	defaultChecked,
}) => {
	return (
		<>
			<input
				type={type}
				name={name}
				id={id}
				value={value}
				placeholder={placeholder}
				onClick={onClick}
				defaultChecked={defaultChecked}
				{...register(name)}
			/>
			{error && <span className={classNameError}>{error.message}</span>}
		</>
	);
};

export default InputComponent;
