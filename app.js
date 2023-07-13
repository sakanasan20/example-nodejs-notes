const yargs = require('yargs')
const { addNote, removeNote, listNotes, readNote } = require('./notes')

yargs.version('1.0.0')

yargs.command({
    command: 'add', 
    describe: 'Add note', 
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }, 
        body: {
            describe: 'Note body', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove', 
    describe: 'Remove note', 
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

yargs.command({
    command: 'list', 
    describe: 'List notes', 
    handler() {
        listNotes()
    }
})

yargs.command({
    command: 'read', 
    describe: 'Read note', 
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})

yargs.parse()