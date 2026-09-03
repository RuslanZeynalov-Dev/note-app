"use client"

import {create} from "zustand"
import {persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer";

const useNotes = create()(
    persist(
        immer(
            (set, get) => ({

                notes: {},
                getAllNotes: () => {
                    return Object.values(get().notes)

                },

                getNoteById: (id) => {
                    return get().notes[id]
                },

                deleteNoteById: (id) => {set((state)=> {
                    delete state.notes[id]
                })},

                createNote: (newNote) => set(
                    (state) => {
                        state.notes[newNote.id] = newNote
                    }
                ),


            }),
        ),
        {
            name: "note-store"
        }
    )
)

export default useNotes