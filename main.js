import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector(".form");
const formInputs = document.querySelectorAll("form input");

let formValues = {};

let state = {
  todos: [],
};

// Functions
function submitForm(e) {
  e.preventDefault();
  state.todos.push(formValues);
  clearUI();
  console.log(state.todos);
}

function getFormValues(e) {
  formValues = { ...formValues, [e.target.name]: e.target.value, id: uuidv4() };
}

function clearUI() {
  formInputs.forEach((item) => (item.value = ""));
}

// Add EvenetListiners
form.addEventListener("submit", submitForm);
form.addEventListener("change", getFormValues);
