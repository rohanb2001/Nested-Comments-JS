import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector(".form");
const formInputs = document.querySelectorAll("form input");
const nestedForm = document.querySelector(".form.nested-form");
const parentUL = document.querySelector(".parent-comments");
const childUlL = document.querySelector(".child-comments");
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
  if (e.target.classList.contains("parent-form")) {
    state.todos.push(formValues);
    showUI();
    clearUI();
    formValues = {};
  } else if (e.target.classList.contains("nested-form")) {
    modalContainer.classList.remove("active");
    addNestedComments();
    showUI();
    showNestedComments();
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
        </li>
        `
      );
    }, "");

    parentUL.innerHTML = str;
  } else {
    parentUL.innerHTML = "";
  }
}

function showNestedComments() {
  let str = "";
  state.todos.forEach((item) => {
    if (item.id === state.commentID) {
      if (item.nestedComments.length) {
        item.nestedComments.reduce((acc, curr) => {
          return acc + createNestedComment(curr);
        }, "");
      } else {
        createNestedComment(str);
      }
    }
  });
}

function addNestedComments() {
  state.todos.forEach((item) => {
    if (item.id === state.commentID) {
      item.nestedComments.push(nestedCommentValues);
    }
  });
}

function createNestedComment(curr) {
  const childUL = document.createElement("ul");
  childUL.className = "child-comments";
  const childLI = document.createElement("li");
  childLI.className = "replied-comment";
  const firstSpan = document.createElement("span");
  const secondSpan = document.createElement("span");
  firstSpan.innerText = `${curr.replyPerson}`;
  secondSpan.className = "replied";
  secondSpan.innerText = "Replied";
  const para = document.createElement("p");
  para.innerText = `${curr.reply}`;
  childLI.append(firstSpan, secondSpan, para);
  childUL.append(childLI);
  parentUL.append(childUL);
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
parentUL.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);
nestedForm.addEventListener("submit", submitForm);
nestedForm.addEventListener("change", getFormValues);
