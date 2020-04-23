import React, { useState, useEffect } from "react";
import "./create.css";
import UploadImage from "./image/image";
import Aux from "../../hoc/Aux";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../axios";
import IngredientList from "./Ingredient/ingredient";
import Selected from "../../components/FilterContainer/IngredientsContainer/SuggestionContainer/selected";
import BasicInfo from "./BasicInfo/basic";
import CheckBox from "./Checkmark/checkmark";
import IngredientsContainer from "../../components/NewIngredients/NewIngredients";
import CustomButton from "../../components/CustomButton/customButton";
const Create = ({
  match: {
    params: { id },
  },
}) => {
  const [basicState, setBasicState] = useState({
    title: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    instructions: "",
    cost: "",
  });

  const [time, setTime] = useState(0);

  const [allergy, setAllergy] = useState({
    glutenFree: false,
    vegan: false,
    vegetarian: false,
    dairyFree: false,
  });

  const { glutenFree, vegan, vegetarian, dairyFree } = allergy;

  const {
    title,
    cost,
    calories,
    carbs,
    protein,
    fat,
    instructions,
  } = basicState;

  const changeBasicState = (e) => {
    return setBasicState({
      ...basicState,
      [e.target.name]: e.target.value + "",
    });
  };

  const changeAllergyState = (e) => {
    return setAllergy({
      ...allergy,
      [e.target.name]: e.target.checked,
    });
  };

  const changeTimeState = (e) => {
    return setTime(e.target.checked ? e.target.value : 0);
  };
  const [ingredients, setIngredients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getRecipeData = async (id) => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/recipes/${id}`);
        setLoading(false);
        const {
          title,
          cost,
          instructions,
          ingredients,
          image,
          readyInMinutes,
          nutrients: { calories, carbs, protein, fat },
          glutenFree,
          dairyFree,
          vegan,
          vegetarian,
        } = data;
        setBasicState({
          title,
          cost,
          calories,
          carbs: carbs.replace("g", ""),
          protein: protein.replace("g", ""),
          fat: fat.replace("g", ""),
          instructions,
        });
        setAllergy({
          glutenFree,
          vegan,
          vegetarian,
          dairyFree,
        });
        setTime(readyInMinutes);
        setIngredients(ingredients);
        setImageSrc(image);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
      }
    };
    if (id) {
      getRecipeData(id);
    } else {
      setImageSrc("");
      setBasicState({
        title: "",
        instructions: "",
        cost: "",
        carbs: "",
        calories: "",
        protein: "",
        fat: "",
      });
      setAllergy({
        glutenFree: false,
        dairyFree: false,
        vegan: false,
        vegetarian: false,
      });
      setTime(0);
      setIngredients([]);
    }
  }, [id]);

  const changeIngredientState = (e, ingredient) => {
    if (e.target.checked) {
      setIngredients([...ingredients, ingredient]);
    } else {
      const filteredIngredient = ingredients.filter((ingra) => {
        return ingra._id !== ingredient._id;
      });

      setIngredients(filteredIngredient);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Aux>
      <main role="main" className="main-container">
        <div className="main-wrap">
          <div>
            <h1 className="main-header-title">
              Welcome
              <br />
              to Scrumptious!
              <img
                alt="divider"
                src="https://d3ht75ktbmcel5.cloudfront.net/assets/v4/graphic_logo-32f5e045575f4f5f5781250ebb643898815e0def963fa44b4ff7dee327a10e32.svg"
                className="logo-image"
              />
            </h1>
            <div className="non-block"></div>
            <div>
              <section className="basic-info-block">
                <h3>Tell us about the recipe</h3>
                <div className="family-member">
                  <BasicInfo
                    type="text"
                    required
                    name="title"
                    label="Recipe Name"
                    changed={changeBasicState}
                    value={title}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    required
                    name="cost"
                    label="Cost (in cents)"
                    changed={changeBasicState}
                    value={cost}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    required
                    name="calories"
                    label="Calories"
                    changed={changeBasicState}
                    value={calories}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    required
                    name="carbs"
                    label="Carbs(in g)"
                    changed={changeBasicState}
                    value={carbs}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    required
                    name="protein"
                    label="Protein(in g)"
                    changed={changeBasicState}
                    value={protein}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    required
                    name="fat"
                    label="Fat(in g)"
                    changed={changeBasicState}
                    value={fat}
                    id={id}
                  />
                  <BasicInfo
                    textarea
                    type="text"
                    required
                    name="instructions"
                    label="Instructions (Enter steps seperated by period)"
                    changed={changeBasicState}
                    value={instructions}
                  />
                </div>
              </section>
            </div>

            <div>
              <section className="basic-info-block">
                <h3>Do any of the following apply to you?</h3>
                <div className="basic-instructions">
                  You can change this at any time
                </div>
                <div className="form-group-wrap-2col">
                  <CheckBox
                    allergy={glutenFree}
                    changed={changeAllergyState}
                    label="Gluten Free"
                    name="glutenFree"
                  />
                  <CheckBox
                    allergy={vegan}
                    changed={changeAllergyState}
                    label="Vegan"
                    name="vegan"
                  />
                  <CheckBox
                    allergy={vegetarian}
                    changed={changeAllergyState}
                    label="Vegetarian"
                    name="vegetarian"
                  />
                  <CheckBox
                    allergy={dairyFree}
                    changed={changeAllergyState}
                    label="Dairy Free"
                    name="dairyFree"
                  />
                </div>
              </section>
            </div>

            <div>
              <section className="basic-info-block">
                <h3>How much time does it take to prepare this recipe?</h3>

                <div className="form-group-wrap-2col">
                  <CheckBox
                    changed={changeTimeState}
                    time={time}
                    value="10"
                    label="10 min"
                    name="readyInMinutes"
                  />
                  <CheckBox
                    changed={changeTimeState}
                    time={time}
                    value="20"
                    label="20 min"
                    name="readyInMinutes"
                  />
                  <CheckBox
                    time={time}
                    changed={changeTimeState}
                    value="30"
                    label="30 min"
                    name="readyInMinutes"
                  />
                  <CheckBox
                    time={time}
                    changed={changeTimeState}
                    value="45"
                    label="45 min"
                    name="readyInMinutes"
                  />
                  <CheckBox
                    time={time}
                    changed={changeTimeState}
                    value="60"
                    label="60 min"
                    name="readyInMinutes"
                  />
                  <CheckBox other label="Other" setTime={setTime} />
                </div>
              </section>
            </div>
            <div>
              <section className="basic-info-block">
                <h3>What ingredients do you wanna include?</h3>
                <div className="basic-instructions">
                  Below are some ingredients from your fridge
                </div>
                <div className="form-group-wrap-2col">
                  <IngredientList
                    ingredients={ingredients}
                    changeIngredientState={changeIngredientState}
                  />
                  <IngredientsContainer ingro />
                  <Selected
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                  />
                </div>
              </section>
            </div>
            <UploadImage
              id={id}
              setImageSrc={setImageSrc}
              image={imageSrc}
              setImage={setImage}
            />
            <CustomButton type="submit">Submit</CustomButton>
          </div>
        </div>
      </main>
    </Aux>
  );
};

export default Create;
