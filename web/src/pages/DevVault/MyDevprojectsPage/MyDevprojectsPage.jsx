// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import styles from './MyDevprojectsPage.module.css'
import { useRef } from 'react'


const MyDevprojectsPage = () => {
  const storageKey = 'devvault-project'
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [tech, setTech] = useState('')
  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [showInputs, setShowInputs] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [typedResponse, setTypedResponse] = useState('')
  const typingIntervalRef = useRef(null)
  const hasRenderedOnce = useRef(false)


const requestAI = async () => {
  const prompt = `Project Title: ${title}
Tech Stack: ${tech}
Description: ${description}
Notes: ${notes}
This project is ${isPublic ? 'public' : 'private'}.

Based on this, provide feedback, suggestions, or possible directions for development.`

  const res = await fetch('/.redwood/functions/askAi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  const data = await res.json()
  const output = data.output || ''

  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current)
    typingIntervalRef.current = null
  }

  setAiResponse(output)
  setTypedResponse('')

  let i = 0
  typingIntervalRef.current = setInterval(() => {
    setTypedResponse((prev) => {
      if (i < output.length) {
        const next = prev + output[i]
        i++
        return next
      } else {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
        return prev
      }
    })
  }, 15)
}


useEffect(() => {
  if (hasRenderedOnce.current) {
    if (!isOpen && aiResponse === '') {
      requestAI()
    }
  } else {
    hasRenderedOnce.current = true
  }
}, [isOpen])


  useEffect(() => {
    let timeout
    if (isOpen) {
      setShowInputs(false)
      timeout = setTimeout(() => setShowInputs(true), 400)
    } else{
      setShowInputs(false)
    }
    return () => clearTimeout(timeout)
}, [isOpen])

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem(storageKey))
  if (saved) {
    setTitle(saved.title || '')
    setTech(saved.tech || '')
    setDescription(saved.description || '')
    setNotes(saved.notes || '')
    setIsPublic(saved.isPublic ?? true)
  }
}, [])

useEffect(() => {
  const data = { title, tech, description, notes, isPublic }
  localStorage.setItem(storageKey, JSON.stringify(data))
}, [title, tech, description, notes, isPublic])

useEffect(() => {
  return () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }
  }
}, [])



  return (
    <>
      <Metadata title="My Projects" description="MyDevprojects page" />

      <div className={styles['box-row']}>
      <div
        onClick={!isOpen ? () => setIsOpen(true) : undefined}
        className={`${styles['project-box']} ${isOpen ? styles.expanded : styles.collapsed}`}>
          {showInputs && (
            <div onClick={(e) => e.stopPropagation()} className={`${styles['fade-in']} ${styles['input-wrapper']}`}>
              <button onClick={() => setIsOpen(false)} className={styles['back-button']}>
                {'<'}
              </button>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Project Title'
                className={styles['project-input']}
              />

              <input
                type='text'
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder='Tech Used (e.g. React, Node)'
                className={styles['project-input']}
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Project Description'
                className={styles['project-textarea']}
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Notes'
                className={styles['project-textarea']}
              />

              <div className={styles['toggle-container']}>
                <span>{isPublic ? 'Public' : 'Private'}</span>
                <label className={styles['toggle-switch']}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <span className={styles['slider']}></span>
                </label>
              </div>
            </div>
          )}

          {!isOpen && (
            <div className={styles['project-title-closed']}>
              {title || 'Untitled Project'}
            </div>
          )}
        </div>

        <div className={styles['ai-box']}>
          {aiResponse ? (
            <>
            <p className={styles['typing-cursor']}>{typedResponse}</p>
            <button className={styles['genBtn']} onClick={requestAI}>Generate New</button>
            </>
          ) : (
            <>
            <p className={styles['placeholder']}>The AI response will appear here.</p>
            </>
          )}
        </div>
        </div>
    </>
  )
}

export default MyDevprojectsPage
