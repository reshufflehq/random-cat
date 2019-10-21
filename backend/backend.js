import { update, get } from '@reshuffle/db';

/**
 * Save the new http link given from client-side input
 *
 * @param { object } link - http link to cat image, object link store {number} id and {string} url
 *
 * @return { array } - list with all cats links including the added one
 */
/* @expose */
export async function addNewUrl(link = {}) {
  return update('links', (list = []) => list.concat(link));
}

/**
 * Delete link from the list by link id
 *
 * @param { number } id - unique id of link
 *
 * @return { array } - updated list with all cats links after the link was deleted
 */
/* @expose */
export async function deleteLinkById(id) {
  return update('links', (list = []) => list.filter(link => link.id !== id));
}

/**
 * List of all cats images urls
 *
 * @return { array } - list with all cats links
 */
/* @expose */
export async function getLinks() {
  return get('links') || [];
}
