import { FormComponent, FormSummary } from './components/index.js';
import { useState } from 'react';
import './App.css';

function App() {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [userData, setUserData] = useState(null);
	const [userCv, setUserCv] = useState(null);

	return (
		<>
			{isFormSubmitted ? (
				<FormSummary
					className='main_container'
					userCv={userCv}
					userData={userData}
				/>
			) : (
				<FormComponent
					className='main_container'
					setIsFormSubmitted={setIsFormSubmitted}
					setUserCv={setUserCv}
					setUserData={setUserData}
				/>
			)}
		</>
	);
}

export default App;
