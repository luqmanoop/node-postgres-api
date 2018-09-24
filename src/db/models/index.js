import authors from './author';
import posts from './post';

export default async (client) => {
  try {
    await client.query(authors.CREATE_TABLE);
    await client.query(posts.CREATE_TABLE);
    console.log('initialized models');
  } catch (error) {
    console.log(error);
  }
};
