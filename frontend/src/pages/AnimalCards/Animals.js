import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimalsContext } from '../../hooks/useAnimalsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-awesome-reveal';

import './animals.css';
import '../../loading.css';
import FormData from 'form-data';

const Animals = () => {
  const { animals, dispatch } = useAnimalsContext();
  console.log(animals);

  const navigate = useNavigate();
  let [allAnimals, setAllAnimals] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [isEditing, setIsEditing] = useState(false);
  let [empty, isEmpty] = useState([]);
  let [editAnimal, setEditAnimal] = useState({
    name: '',
    species: '',
    age: '',
    photo: '',
  });
  useEffect(() => {
    const getAnimals = async () => {
      try {
        const response = await fetch('http://localhost:5678/animals');
        const json = await response.json();
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        if (response.ok) {
          setAllAnimals(json);
          setIsLoading(false);
          isEmpty(false);
        }

        if (json.length === 0) {
          isEmpty(true);
          navigate('/all-animals');
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    getAnimals();
  }, [dispatch, navigate]);

  const deleteAnimal = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5678/animals/${id}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      if (response.ok) {
        setAllAnimals(allAnimals.filter((animal) => animal._id !== id));

        toast.success('Animal deleted successfully!');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const editAnimalHandler = (id) => {
    const animalToEdit = allAnimals.find((animal) => animal._id === id);
    setEditAnimal(animalToEdit);
    setIsEditing(true);
  };

  const updateAnimal = async (e) => {
    e.preventDefault();
    // use form data
    const formData = new FormData();
    formData.append('name', editAnimal.name);
    formData.append('species', editAnimal.species);
    formData.append('age', editAnimal.age);
    formData.set('image', editAnimal.photo[0]);

    try {
      if (
        editAnimal.name === '' ||
        editAnimal.species === '' ||
        editAnimal.age === '' ||
        editAnimal.photo === ''
      ) {
        setError(true);
        toast.error('Please fill in all fields');
        return;
      }

      // validate id editAnimal.age is a number
      if (isNaN(editAnimal.age)) {
        setError(true);
        toast.error('Age must be a number');
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5678/animals/${editAnimal._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      if (response.ok) {
        // dispatch({
        //   type: 'UPDATE_ANIMAL',
        //   payload: {
        //     id: editAnimal._id,
        //     name: editAnimal.name,
        //     species: editAnimal.species,
        //     age: editAnimal.age,
        //     photo: editAnimal.photo,
        //   },
        // });
        // navigate('/all-animals');

        const json = await response.json();
        const updatedAnimals = allAnimals.map((animal) => {
          if (animal._id === json._id) {
            return json;
          }

          return animal;
        });

        setAllAnimals(updatedAnimals);
        toast('Updated successfully');
        setIsEditing(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="animals">
      {empty && (
        <div className="empty">
          <h1>
            Oops! &nbsp;
            <i className="fas fa-paw"></i>
            &nbsp; No animals found!
          </h1>
        </div>
      )}
      {error && <p>{error.message}</p>}

      {allAnimals.map((animal) => {
        return (
          <div className="card-container" key={animal._id}>
            <Bounce
              cascade
              damping={0.1}
              triggerOnce
              direction="down"
              duration={1000}
            >
              <ToastContainer />
              <div className="card">
                <span className="back-home">
                  <p onClick={() => navigate('/')}>
                    <strong>
                      <i
                        className="fas fa-dog"
                        style={{
                          color: '#1AAC83',
                        }}
                      ></i>
                    </strong>
                  </p>
                </span>
                <div className="item">
                  <div className="info">
                    <img src={animal.photo} alt={animal.name} />
                    <h2>Name: {animal.name}</h2>
                    <p>Specie: {animal.species}</p>
                    <p>Age: {animal.age}</p>
                    <button
                      className="delete-button"
                      onClick={() => deleteAnimal(animal._id)}
                    >
                      Delete
                    </button>
                    <button onClick={() => editAnimalHandler(animal._id)}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              {isLoading && (
                <h1
                  style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    color: '#1AAC83',
                  }}
                >
                  loading....
                </h1>
              )}
            </Bounce>
          </div>
        );
      })}
      {isEditing && (
        <div className="edit-animal modal">
          <ToastContainer />

          <form onSubmit={updateAnimal}>
            <span className="cancel">
              <p onClick={() => setIsEditing(false)}>X</p>
            </span>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={editAnimal.name}
              onChange={(e) =>
                setEditAnimal({ ...editAnimal, name: e.target.value })
              }
            />
            <label htmlFor="species">Species</label>
            <input
              type="text"
              name="species"
              value={editAnimal.species}
              onChange={(e) =>
                setEditAnimal({ ...editAnimal, species: e.target.value })
              }
            />
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              value={editAnimal.age}
              onChange={(e) =>
                setEditAnimal({ ...editAnimal, age: e.target.value })
              }
            />
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={(e) =>
                setEditAnimal({ ...editAnimal, photo: e.target.files })
              }
            />
            {/* loading */}
            {isLoading && (
              <h1
                style={{
                  color: '#1AAC83',
                  textAlign: 'center',
                  marginTop: '2rem',
                }}
              >
                Loading...
              </h1>
            )}
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Animals;
