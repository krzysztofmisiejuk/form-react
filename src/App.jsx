import { useState } from 'react';
import Form from './components/Form/Form.jsx';
import Modal from './components/modal/Modal.jsx';
import './App.css';

function App() {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [userData, setUserData] = useState(null);
	const [modalImg, setModalImg] = useState(null);

	return (
		<>
			{isFormSubmitted ? (
				<Modal
					imgSrc={modalImg}
					userData={userData}
				/>
			) : (
				<Form
					setIsFormSubmitted={setIsFormSubmitted}
					setModalImg={setModalImg}
					setUserData={setUserData}
				/>
			)}
		</>
	);
}

export default App;
