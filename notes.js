const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
  return "Your notes...";
};
const addNotes = (title, body) => {
  const allNotes = extractNotes();

  const isDuplicateNote = allNotes.find(note => note.title === title);
  debugger;
  if (!isDuplicateNote) {
    allNotes.push({
      title: title,
      body: body
    });
    const allNotesJSON = JSON.stringify(allNotes);
    fs.writeFileSync("notes.json", allNotesJSON);
    console.log(chalk.green.inverse("Note added successfully"));
  } else {
    console.log(chalk.red.inverse("Note title already exists"));
  }
};
const extractNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = title => {
  const allNotes = extractNotes();
  const notesToKeep = allNotes.filter(note => {
    return !(note.title === title);
  });
  if (allNotes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed successfully!"));
    const dataJSON = JSON.stringify(notesToKeep);
    fs.writeFileSync("notes.json", dataJSON);
  } else console.log(chalk.red.inverse("Note not found!"));
};

const listNotes = () => {
  const allNotes = extractNotes();
  if (allNotes.length === 0) console.log(chalk.red.inverse("List is empty!"));
  else {
    console.log(chalk.yellow.inverse("Printing list..."));
    allNotes.forEach(note => {
      console.log(note.title);
    });
  }
};
const readNote = title => {
  const notes = extractNotes();
  const noteToRead = notes.find(note => note.title === title);
  if (noteToRead) {
    console.log(chalk.yellow.inverse("Reading your note..."));
    console.log(chalk.green.bold(title));
    console.log(noteToRead.body);
  } else console.log(chalk.red.inverse("Note not found!"));
};
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
