import axios from "axios";

const getApps = () => {
  const string = localStorage.getItem("apps");
  const array = JSON.parse(string);
  return array;
};

const addApp = (app) => {
  const apps = JSON.parse(localStorage.getItem("apps"));
  if (apps) {
    apps.push({ ...app, id: apps.length });
    localStorage.setItem("apps", JSON.stringify(apps));
  } else {
    let newApps = [];
    newApps.push({ ...app, id: 0 });
    localStorage.setItem("apps", JSON.stringify(newApps));
  }
};

const removeApp = (id) => {
  const apps = JSON.parse(localStorage.getItem("apps"));
  const filtered = apps.filter((app) => app.id !== id);
  localStorage.setItem("apps", JSON.stringify(filtered));
};

export { getApps, addApp, removeApp };
