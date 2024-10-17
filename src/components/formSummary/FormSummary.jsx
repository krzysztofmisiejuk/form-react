import style from './FormSummary.module.css';
const FormSummary = ({ imgSrc, userData, className }) => {
	return (
		<>
			<h1>Dane z Formularza</h1>
			<div className={className}>
				<div className={style.main_container}>
					<div>
						<h2>Dane osobowe:</h2>
						<p>Imię: {userData.firstName}</p>
						<p>Nazwisko: {userData.lastName}</p>
						<p>E-mail: {userData.email}</p>
						<p>Numer telefonu: {userData.phoneNumber}</p>
					</div>
					<div>
						<h2>Doświadczenie w programowaniu:</h2>
						{userData.experience.length > 0 ? (
							<ul>
								{userData.experience.map((exp) => {
									return (
										<li key={`${exp.expTechnology}${exp.yearsOfExperience}`}>
											Technologia {exp.expTechnology} / poziom:{' '}
											{exp.yearsOfExperience}
										</li>
									);
								})}
							</ul>
						) : (
							<li>Brak doświadczenia w programowaniu</li>
						)}
					</div>
					<div>
						<h2>Preferencje kursu</h2>
						<p>Tryb kursu: {userData.preferences}</p>
						<h3>Preferowane technologie:</h3>
						<ul>
							{userData?.prefTechnology.map((tech) => {
								return <li key={tech}>{tech}</li>;
							})}
						</ul>
					</div>
					<h2>Curriculum vitae:</h2>
					<img
						src={imgSrc}
						alt=''
						width={300}
					/>
				</div>
			</div>
		</>
	);
};

export default FormSummary;
