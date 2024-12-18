'use client'

import CharacterCount from '@tiptap/extension-character-count'
import CodeBlock from '@tiptap/extension-code-block'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Dispatch, SetStateAction } from 'react'
import { Markdown } from 'tiptap-markdown'

interface Props {
  content?: string
  setContent?: Dispatch<SetStateAction<string>>
  editable?: boolean
  limit?: number
  placeholder?: string
}

export default function useBlockEditor({
  content,
  setContent,
  editable,
  limit,
  placeholder,
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    autofocus: editable ? true : false,
    editable: editable ? true : false,
    content,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder,
        showOnlyCurrent: false,
      }),
      Markdown,
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      CodeBlock,
      CharacterCount.configure({
        limit,
      }),
    ],
    onUpdate({ editor }) {
      setContent && setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `${editable ? 'min-h-40' : ''} w-full outline-none`,
      },
    },
  })

  return { editor }
}
