import { useState } from 'react';
import FormData from 'form-data';
import { useNavigate } from 'react-router-dom';
import { useAnimalsContext } from '../../hooks/useAnimalsContext';
import axios from 'axios';
import './create.css';
import '../../loading.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateNewAnimal = () => {
  const { dispatch } = useAnimalsContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [animal, setAnimal] = useState({
    name: '',
    species: '',
    age: '',
    photo: '',
  });

  const postNewAnimal = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', animal.name);
    formData.append('species', animal.species);
    formData.append('age', animal.age);
    formData.set('image', animal.photo[0]);

    try {
      //validate empty fields
      if (
        animal.name === '' ||
        animal.species === '' ||
        animal.age === '' ||
        animal.photo === ''
      ) {
        setError(true);
        toast.error('Please fill in all fields');
        return;
      }
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:5678/animals',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data) {
        throw new Error('Something went wrong!');
      }
      if (response.data) {
        dispatch({ type: 'CREATE_ANIMAL', payload: response.data });
        setIsLoading(false);
        navigate('/all-animals');
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="create-new-animal"> 
      <ToastContainer />
      <form onSubmit={postNewAnimal}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={animal.name}
          onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
        />

        <label htmlFor="species">Species</label>
        <input
          type="text"
          name="species"
          id="species"
          value={animal.species}
          onChange={(e) => setAnimal({ ...animal, species: e.target.value })}
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={animal.age}
          onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
        />

        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={(e) => setAnimal({ ...animal, photo: e.target.files })}
        />

        <button type="submit">Submit</button>

        {error && <p className="error">{error}</p>}
        {isLoading && (
          <div class="loadingio-spinner-reload-e5sgld2eww">
            <div class="ldio-1td4xktwchm">
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateNewAnimal;
