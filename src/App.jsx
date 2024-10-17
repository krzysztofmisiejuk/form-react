import { useState } from 'react';
import { FormComponent, FormSummary } from './components/index.js';
import './App.css';

function App() {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [userData, setUserData] = useState(null);
	const [modalImg, setModalImg] = useState(null);

	return (
		<>
			{isFormSubmitted ? (
				<FormSummary
					className='main_container'
					imgSrc={modalImg}
					userData={userData}
				/>
			) : (
				<FormComponent
					className='main_container'
					setIsFormSubmitted={setIsFormSubmitted}
					setModalImg={setModalImg}
					setUserData={setUserData}
				/>
			)}
		</>
	);
}

export default App;
