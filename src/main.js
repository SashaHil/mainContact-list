import { formEl, containerEl } from "./refs";
import { postData, getData, deleteData, updateData } from "./api";
import { createCard } from "./markup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  try {
    const data = Object.fromEntries(new FormData(e.target));
    data.createdAt = Date.now();

    const response = await postData(data);
    const markup = createCard([data]);
    addMarkup(markup);

    e.target.reset();
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  try {
    const response = await getData();
    if (!response.length) {
      return;
    }
    const markup = createCard(response);
    addMarkup(markup);
  } catch (error) {
    console.log(error.message);
  }
}

function addMarkup(markup) {
  containerEl.insertAdjacentHTML("beforeend", markup);
}

init();

containerEl.addEventListener("click", deleteCard);

async function deleteCard(event) {
  try {
    if (event.target.nodeName !== "BUTTON") {
      return;
    }
    const { cardId, card } = getInfoCard(event);
    await deleteData(cardId);
    card.remove();
  } catch (error) {
    console.log(error.message);
  }
}
containerEl.addEventListener("input", updateName);
async function updateName(event) {
  try {
    const name = event.target.textContent;

    const { cardId } = getInfoCard(event);
    await updateData({ name }, cardId);
  } catch (error) {
    console.log(error.message);
  }
}
function getInfoCard(event) {
  const card = event.target.closest(".js-wrap-card");
  const cardId = card.dataset.cardid;
  return { cardId, card };
}
