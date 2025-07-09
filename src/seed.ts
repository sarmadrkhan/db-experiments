import { faker } from '@faker-js/faker';
import { query } from './db';

const users: string[] = [];
const posts: { id: string; user_id: string }[] = [];
const comments: { id: string; post_id: string; user_id: string }[] = [];
const likes: { id: string; user_id: string; comment_id: string }[] = [];

const insertUsers = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    users.push(id);
    await query(
      'INSERT INTO users (id, name, email) VALUES ($1, $2, $3)',
      [id, faker.person.fullName(), faker.internet.email()]
    );
  }
};

const insertPosts = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const user_id = users[Math.floor(Math.random() * users.length)];
    posts.push({ id, user_id });
    await query(
      'INSERT INTO posts (id, user_id, title, body) VALUES ($1, $2, $3, $4)',
      [id, user_id, faker.lorem.sentence(), faker.lorem.paragraph()]
    );
  }
};

const insertComments = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const post = posts[Math.floor(Math.random() * posts.length)];
    const user_id = users[Math.floor(Math.random() * users.length)];
    comments.push({ id, post_id: post.id, user_id });
    await query(
      'INSERT INTO comments (id, post_id, user_id, content) VALUES ($1, $2, $3, $4)',
      [id, post.id, user_id, faker.lorem.sentences(2)]
    );
  }
};

const insertLikes = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const user_id = users[Math.floor(Math.random() * users.length)];
    const comment = comments[Math.floor(Math.random() * comments.length)];
    likes.push({ id, user_id, comment_id: comment.id });
    await query(
      'INSERT INTO likes (id, user_id, comment_id) VALUES ($1, $2, $3)',
      [id, user_id, comment.id]
    );
  }
};

const insertLikesBatch = async (count: number, batchSize = 1000) => {
  for (let i = 0; i < count; i += batchSize) {
    const batch: { id: string; user_id: string; comment_id: string }[] = [];

    for (let j = 0; j < batchSize && i + j < count; j++) {
      const id = faker.string.uuid();
      const user_id = users[Math.floor(Math.random() * users.length)];
      const comment = comments[Math.floor(Math.random() * comments.length)];
      likes.push({ id, user_id, comment_id: comment.id });
      batch.push({ id, user_id, comment_id: comment.id });
    }

    const values: string[] = [];
    const params: any[] = [];

    batch.forEach((like, idx) => {
      const base = idx * 3;
      values.push(`($${base + 1}, $${base + 2}, $${base + 3})`);
      params.push(like.id, like.user_id, like.comment_id);
    });

    await query(
      `INSERT INTO likes (id, user_id, comment_id) VALUES ${values.join(', ')}`,
      params
    );
  }
};

const seed = async () => {
  console.time('seeding');
  
  await insertUsers(100);
  await insertPosts(1000);
  await insertComments(10000);

  console.time('likes_individual');
  await insertLikes(50000);
  console.timeEnd('likes_individual');

  console.time('likes_batch');
  await insertLikesBatch(50000);
  console.timeEnd('likes_batch');

  console.timeEnd('seeding');
};

seed();
