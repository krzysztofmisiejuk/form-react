const SelectComponent = ({
	className,
	name,
	register,
	options,
	multiple,
	size,
}) => {
	return (
		<select
			className={className}
			name={name}
			multiple={multiple}
			size={size}
			{...register(name)}
		>
			{options.map((option) => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.text}
				</option>
			))}
		</select>
	);
};

export default SelectComponent;
