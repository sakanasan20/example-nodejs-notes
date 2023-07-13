const fs = require('fs')
const chalk = require('chalk')

const notesFileName = 'notes.json'

const addNote = (title, body) => {
    const notes = loadNotes()
    const foundNote = notes.find(note => note.title === title)
    const isTitleTaken = foundNote !== undefined
    if (isTitleTaken) {
        return console.log(chalk.red.inverse('Note title taken'))
    }
    const newNote = { title, body }
    notes.push(newNote)
    saveNotes(notes)
    console.log(chalk.green.inverse('Note added'))
}

const removeNote = (title,) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    const isNoteExist = notes.length > notesToKeep.length
    if (!isNoteExist) {
        return console.log(chalk.red.inverse('Note not found'))
    }
    saveNotes(notesToKeep)
    console.log(chalk.green.inverse('Note deleted'))
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach(note => console.log(chalk.green.inverse(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find(note => note.title === title)
    const isNoteExist = foundNote !== undefined
    if (!isNoteExist) {
        return console.log(chalk.red.inverse('Note not found'))
    }
    console.log(chalk.inverse(foundNote.title))
    console.log(foundNote.body)
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync(notesFileName)
        const notesJson = notesBuffer.toString()
        const notes = JSON.parse(notesJson)
        return notes
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    try {
        const notesJson = JSON.stringify(notes)
        fs.writeFileSync(notesFileName, notesJson)
        return notes
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote, 
    removeNote, 
    listNotes, 
    readNote
}