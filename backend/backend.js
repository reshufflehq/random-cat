import { update, get } from '@reshuffle/db';

const LINKS = 'links';
/**
 * Save the new http link given from client-side input
 *
 * @param { string } link - http link to cat image, object link stores an {string} url
 *
 * @return { array } - list with all cats links including the added one
 */
/* @expose */
export async function addNewUrl(link) {
  return update(LINKS, (list = []) => list.concat(link));
}

/**
 * Delete link from the list by link id
 *
 * @param { string } url - link of the image to be deleted
 *
 * @return { array } - updated list with all cats links after the link was deleted
 */
/* @expose */
export async function deleteLink(url) {
  return update(LINKS, (list = []) => list.filter(link => link !== url));
}

/**
 * List of all cats images urls
 *
 * @return { array } - list with all cats links
 */
/* @expose */
export async function getLinks() {
  return get(LINKS) || [];
}
