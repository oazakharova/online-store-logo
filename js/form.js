"use strict";

const applicantForm = document.querySelector(".describe-form");
const loader = document.querySelector(".form-loader");

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);

  toggleLoader();
  const { status, error } = await sendData(data);
  toggleLoader();

  if (status === 200) {
    onSuccess(event.target);
  } else {
    onError(error);
  }
}

function serializeForm(formNode) {
  return new FormData(formNode);
}

async function sendData(data) {
  return await fetch("/api/apply/", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
}

function toggleLoader() {
  loader.classList.toggle("hidden");
}

function onSuccess(formNode) {
  alert("Ваша заявка отправлена!");
  formNode.classList.toggle("hidden");
}

function onError(error) {
  alert(error.message);
}

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();

  formNode.querySelector("button").disabled = !isValid;
}

applicantForm.addEventListener("submit", handleFormSubmit);
applicantForm.addEventListener("input", checkValidity);
