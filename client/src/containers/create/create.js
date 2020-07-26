import React, { useState, useEffect } from "react";
import "./create.css";
import { connect } from "react-redux";
import { createAlert } from "../../store/actions/alert";
import { checkVal, checkInt } from "../../regex";
import UploadImage from "./image/image";
import Aux from "../../hoc/Aux";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import IngredientList from "./Ingredient/ingredient";
import Selected from "../../components/FilterContainer/IngredientsContainer/SuggestionContainer/selected";
import BasicInfo from "./BasicInfo/basic";
import CheckBox from "./Checkmark/checkmark";
import IngredientsContainer from "../../components/NewIngredients/NewIngredients";
import CustomButton from "../../components/CustomButton/customButton";
import { Redirect } from "react-router-dom";
const Create = ({
  history,
  createAlert,
  match: {
    params: { id },
  },
  user,
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
    if (
      (e.target.name === "carbs" ||
        e.target.name === "cost" ||
        e.target.name === "protein" ||
        e.target.name === "fat") &&
      e.target.value !== ""
    ) {
      return (
        checkVal(e.target.value) &&
        setBasicState({
          ...basicState,
          [e.target.name]: e.target.value + "",
        })
      );
    }

    if (e.target.name === "calories" && e.target.value !== "") {
      return (
        checkInt(e.target.value) &&
        setBasicState({
          ...basicState,
          [e.target.name]: e.target.value + "",
        })
      );
    }
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
    if (user && !user.isAdmin) {
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
    }
  }, [user, id]);

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

  const checkErrors = () => {
    return (
      title !== "" &&
      cost !== "" &&
      cost !== 0 &&
      calories !== "" &&
      calories !== 0 &&
      carbs !== "" &&
      carbs !== 0 &&
      fat !== "" &&
      fat !== 0 &&
      protein !== "" &&
      protein !== 0 &&
      time !== 0 &&
      instructions !== ""
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!checkErrors()) {
      return createAlert("Please fill all the required fields!", "failure");
    }

    if (ingredients.length === 0) {
      return createAlert("Your recipe must have ingredients", "failure");
    }
    if (image === "" && imageSrc === "") {
      return createAlert("You must upload a recipe image", "failure");
    }
    try {
      const body = {
        title,
        cost: parseInt(cost),
        glutenFree,
        vegan,
        vegetarian,
        dairyFree,
        readyInMinutes: parseInt(time),
        instructions: instructions.includes(".")
          ? instructions
          : instructions + ".",

        nutrients: {
          calories,
          carbs: carbs + "g",
          protein: protein + "g",
          fat: fat + "g",
        },
        ingredients: ingredients.map((ingra) => {
          return { amount: ingra.amount, ingredient: ingra.ingredient._id };
        }),
      };

      if (id) {
        if (imageSrc.includes("spoonacular")) {
          body.image = imageSrc;
        }
        body.id = id;
      }

      const {
        data: { _id },
      } = await axios.post("/recipes", { ...body });
      if (image) {
        const fd = new FormData();
        fd.append("upload", image, image.name);
        await axios.post(`/recipes/image/${_id}`, fd);
      }
      history.push("/my-recipes");
      createAlert(
        `Recipe
      ${id ? "edited" : "created"} succesfully`,
        "success"
      );
    } catch (err) {
      createAlert(
        err.response ? err.response.data.errMessage : err.message,
        "failure"
      );
    }
  };

  if (!user) {
    return <Spinner />;
  }
  if (user && user.isAdmin) {
    return <Redirect to="/users" />;
  }
  return (
    <Aux>
      <main role="main" className="main-container">
        <div className="main-wrap">
          <form onSubmit={(e) => handleFormSubmit(e)}>
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
                    name="title"
                    label="Recipe Name"
                    changed={changeBasicState}
                    value={title}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    name="cost"
                    label="Cost (in cents)"
                    changed={changeBasicState}
                    value={cost}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    name="calories"
                    label="Calories"
                    changed={changeBasicState}
                    value={calories}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    name="carbs"
                    label="Carbs(in g)"
                    changed={changeBasicState}
                    value={carbs}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    name="protein"
                    label="Protein(in g)"
                    changed={changeBasicState}
                    value={protein}
                    id={id}
                  />
                  <BasicInfo
                    type="text"
                    name="fat"
                    label="Fat(in g)"
                    changed={changeBasicState}
                    value={fat}
                    id={id}
                  />
                  <BasicInfo
                    textarea
                    type="text"
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
                  <CheckBox time={time} other label="Other" setTime={setTime} />
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
                    ingro
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
            <CustomButton edit type="submit">
              Submit
            </CustomButton>
          </form>
        </div>
      </main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { createAlert })(Create);
