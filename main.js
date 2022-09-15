import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector(".form");
const formInputs = document.querySelectorAll("form input");
const nestedForm = document.querySelector(".form.nested-form");
const nestedFormInputs = document.querySelectorAll(".form.nested-form input");
const parentUlL = document.querySelector(".parent-comments");
const replyBtn = document.querySelector("button .reply-btn");
const modalContainer = document.querySelector(".modal-container");

let formValues = {};
let nestedCommentValues = {};

let state = {
  commentID: 0,
  todos: [],
};

// Functions
function submitForm(e) {
  e.preventDefault();
  if (e.target.classList.contains("form")) {
    state.todos.push(formValues);
    showUI();
    clearUI();
    console.log(state.todos);
  } else if (e.target.classList.contains("nested-form")) {
  }
  // console.log(nestedCommentValues);
}

function getFormValues(e) {
  formValues = {
    ...formValues,
    [e.target.name]: e.target.value,
    id: uuidv4(),
    nestedComments: [],
  };
}

function showUI() {
  if (state.todos.length) {
    let str = state.todos.reduce((acc, curr) => {
      return (
        acc +
        `
        <li class="comment" data-id=${curr.id}>
          <span>${curr.name}</span>
          <p>
            ${curr.post}
          </p>
          <button class="reply-btn">
            <i class="fa-solid fa-reply"></i> reply
          </button>
        </li>
        `
      );
    }, "");

    parentUlL.innerHTML = str;
  } else {
    parentUlL.innerHTML = "";
  }
}

function clearUI() {
  formInputs.forEach((item) => (item.value = ""));
}

function openModal(e) {
  if (e.target.classList.contains("reply-btn")) {
    modalContainer.classList.add("active");
    state.commentID = e.target.parentElement.getAttribute("data-id");
    console.log(state.commentID);
  }
}

function closeModal(e) {
  if (e.target.classList.contains("modal-container")) {
    modalContainer.classList.remove("active");
  }
}

// Add EvenetListiners
form.addEventListener("submit", submitForm);
form.addEventListener("change", getFormValues);
parentUlL.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);

// nestedForm.addEventListener("submit", submit);
