import Database from "../Database/index.js";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function findAssignmentForCourse(courseId) {
  return Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
}

export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find(
    (assignment) => assignment._id === assignmentId
  );

  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }

  Object.assign(assignment, assignmentUpdates);
  return assignment;
}
