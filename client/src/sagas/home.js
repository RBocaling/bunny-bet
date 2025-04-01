import { call, put, takeLatest } from "redux-saga/effects";
import { bringPayload, showPayload } from "../reducers/home";
import { API_URL } from "../config";

function request() {
  return api().then(function (res) {
    return res;
  });
}

function api() {
  return new Promise(function (resolve, reject) {
    console.log("API_URL", API_URL);

    fetch(`${API_URL}/api/home`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => console.error("fetchBringThemAll2--> " + err));
  });
}

function* fetchBringPayload() {
  try {
    const output = yield call(request);
    yield put(showPayload(output));
  } catch (error) {
    console.log("fetchBringThemAll1--> ", error);
  }
}

export function* homeRegister() {
  yield takeLatest(bringPayload.type, fetchBringPayload);
}
