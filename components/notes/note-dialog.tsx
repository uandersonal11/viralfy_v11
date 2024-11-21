'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Note } from '@/types/notes'

interface NoteDialogProps {
  note: Note | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: (note: Note) => void
}

export function NoteDialog({ note, isOpen, onOpenChange, onSave }: NoteDialogProps) {
  const [title, setTitle] = React.useState(note?.title || '')
  const [content, setContent] = React.useState(note?.content || '')

  React.useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  const handleSave = () => {
    if (note) {
      onSave({
        ...note,
        title: title.trim() || 'Sem título',
        content: content.trim(),
      })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{note?.id ? 'Editar nota' : 'Nova nota'}</DialogTitle>
          <DialogDescription>
            Adicione ou edite os detalhes da sua nota
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-0"
          />
          <Textarea
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none rounded-xl border-gray-200 focus:border-blue-600 focus:ring-0"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}