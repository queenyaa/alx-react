// schema/courses.js

import { schema, normalize } from 'normalizr';

// Define schema entity for courses
export const courseSchema = new schema.Entity('courses');

// Define the coursesNormalizer function
export const coursesNormalizer = data => {
  // Normalize data using courseSchema
  return normalize(data, [courseSchema]);
};