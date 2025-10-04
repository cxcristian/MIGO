"use client";

import { useState } from 'react';
import NoteTaker from '@/app/components/NoteTaker/NoteTaker';
import OptionalPrompt from '@/app/components/OptionalPrompt/OptionalPrompt';
import PdfGuideGenerator from '@/app/components/PdfGuideGenerator/PdfGuideGenerator';

// This interface would ideally be in a shared types file
interface Note {
  subject: string;
  content: string;
}

export default function LearningPage() {
  const [prompt, setPrompt] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (newNote: Note) => {
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  return (
    <main className="flex flex-col md:flex-row md:items-start gap-4 p-4">
      <OptionalPrompt prompt={prompt} setPrompt={setPrompt} />
      <NoteTaker notes={notes} addNote={addNote} />
      <PdfGuideGenerator prompt={prompt} notes={notes} />
    </main>
  );
}
