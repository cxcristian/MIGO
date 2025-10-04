"use client";

import { useState } from 'react';

// The Note type can be defined in a shared types file later
interface Note {
  subject: string;
  content: string;
}

interface NoteTakerProps {
  notes: Note[];
  addNote: (note: Note) => void;
}

export default function NoteTaker({ notes, addNote }: NoteTakerProps) {
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleSaveNote = () => {
    const subject = newSubject.trim();
    const content = newContent.trim();
    const wordCount = content.split(/\s+/).filter(word => word !== '').length;

    if (subject !== '' && wordCount >= 3) {
      addNote({ subject, content });
      setNewSubject('');
      setNewContent('');
    } else {
      if (subject === '') {
        alert('Por favor, ingresa una materia.');
      } else if (wordCount < 3) {
        alert('La nota debe tener al menos 3 palabras.');
      }
    }
  };

  return (
    <section className="md:w-3/5 bg-white p-4 rounded-lg shadow space-y-4">
      <>
        <h2 className="text-lg font-semibold text-[#294380] text-center bg-[#eeeeeeff]">
          Notas
        </h2>
      </>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Materia
        </label>
        <input
          type="text"
          placeholder="Ej. Matemáticas"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Escribe tu nota
        </label>
        <textarea
          rows={5}
          placeholder="Escribe aquí..."
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
            onClick={handleSaveNote}
          >
            Guardar
          </button>
        </div>
      </div>

      <hr />
      <div className="space-y-2">
        <div className="r p-3 border rounded items-center align-center">
          <h2 className="text-lg font-semibold text-[#294380] text-center">
            Notas Guardadas
          </h2>
        </div>
        {notes.map((note, index) => (
          <div key={index} className="p-3 border rounded bg-gray-50 break-words">
            <strong className="font-semibold">{note.subject}</strong>
            <hr className="my-1" />
            {note.content}
          </div>
        ))}
      </div>
    </section>
  );
}
