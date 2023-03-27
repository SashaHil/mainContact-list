const BASE_URL = "http://localhost:3000/contacts/";

export async function postData(data = {}) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export async function getData() {
  const response = await fetch(BASE_URL);

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export async function deleteData(id) {
  const response = await fetch(BASE_URL + id, {
    method: "DELETE",
  });

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export async function updateData(data = {}, id) {
  const response = await fetch(BASE_URL + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}
