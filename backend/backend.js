 import { update, get } from '@reshuffle/db';



/* @expose */
export async function addNewUrl(link = {}) {
  return await update("links", (list = []) => list.concat(link));
}

/* @expose */
export async function deleteLinkById(id) {
  return update("links", (list = []) =>
    list.filter(link => link.id !== id)
  );
}

/* @expose */
export async function getLinks() {
  return (await get('links')) || [];
}


