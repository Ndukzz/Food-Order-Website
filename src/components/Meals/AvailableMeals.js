import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  // ANOTHER WAY OF HANDLING HTTP REQUESTS AND ERRORS USING USEEFFECT AND ASYNC FUNCTIONS
  useEffect(()=> {
    const fetchMeals = async() => {
      // setIsLoading(true)
      const res = await fetch("https://reactmeals-4c3cc-default-rtdb.firebaseio.com/meals.json")
      if( !res.ok ) {
        throw new Error("Something went wrong!!")
      }
      const responseData = await res.json()

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
      console.log(meals);
    }

      fetchMeals().catch(error => {
        setIsLoading(false)
        setError(error.message)
      })
  },[])
  
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  )); 

  // THE CONDITIONAL STATEMENTS CONTROLING THE LOADING STATE 
  let content = <p>No meals</p>

  if(isLoading) {
    content = <p>Loading Meals...</p>
  }else if (error) {
    content = <p>{error}</p>
  } else if( !isLoading && meals.length > 0) {
    content = <ul>{mealsList}</ul>
  } 

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
