const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

export async function fetchNews() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('status ' + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('failed to load', error.message);
    throw error;
  }
}

