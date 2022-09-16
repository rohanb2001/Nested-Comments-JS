import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector(".form");
const formInputs = document.querySelectorAll("form input");
const nestedForm = document.querySelector(".form.nested-form");
const parentUL = document.querySelector(".parent-comments");
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
  if (e.target.classList.contains("parent-form")) {
    state.todos.push(formValues);
    showUI();
    clearUI();
    formValues = {};
  } else if (e.target.classList.contains("nested-form")) {
    modalContainer.classList.remove("active");
    addNestedComments();
    showUI();
    nestedCommentValues = {};
  }
}

function getFormValues(e) {
  if (e.target.classList.contains("parent-input")) {
    formValues = {
      ...formValues,
      [e.target.name]: e.target.value,
      id: uuidv4(),
      nestedComments: [],
    };
  } else if (e.target.classList.contains("child-input")) {
    nestedCommentValues = {
      ...nestedCommentValues,
      [e.target.name]: e.target.value,
    };
  }
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

          <ul class="child-comments">
          ${curr.nestedComments.reduce((acc, curr) => {
            return (
              acc +
              `
                <li class="replied-comment">
              <span>${curr.replyPerson}</span>
              <span class="replied">Replied</span>
              <p>
                ${curr.reply}
              </p>
            </li>
                `
            );
          }, "")}
          </ul>
        </li>
        `
      );
    }, "");

    parentUL.innerHTML = str;
  } else {
    parentUL.innerHTML = "";
  }
}

function addNestedComments() {
  state.todos.forEach((item) => {
    if (item.id === state.commentID) {
      item.nestedComments.push(nestedCommentValues);
    }
  });
}

function clearUI() {
  formInputs.forEach((item) => (item.value = ""));
}

function openModal(e) {
  if (e.target.classList.contains("reply-btn")) {
    modalContainer.classList.add("active");
    state.commentID = e.target.parentElement.getAttribute("data-id");
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
parentUL.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);
nestedForm.addEventListener("submit", submitForm);
nestedForm.addEventListener("change", getFormValues);
