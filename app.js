const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// console.log(process.argv);
// console.log(getNotes());

yargs.version("1.12.0");
yargs.command({
  command: "add",
  describe: "Adds a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.addNotes(argv.title, argv.body);
  }
});
yargs.command({
  command: "remove",
  describe: "Removes a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.removeNote(argv.title);
  }
});
yargs.command({
  command: "list",
  describe: "Display the list of notes",
  handler() {
    notes.listNotes();
  }
});
yargs.command({
  command: "read",
  describe: "Reads a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});
yargs.parse();
// console.log(yargs.argv);
