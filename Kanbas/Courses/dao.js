import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  return courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
}

export function createCourse(course) {
  const newCourse = { ...course, _id: Date.now().toString() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
  const course = Database.courses.find((course) => course._id === courseId);

  if (!course) {
    throw new Error(`Course with ID ${courseId} not found`);
  }

  Object.assign(course, courseUpdates);
  return course;
}

export function getAllCourses() {
  return Database.courses;
}
