import { Metadata } from '@redwoodjs/web'
import { useState, useEffect, useRef } from 'react'
import styles from './MyDevprojectsPage.module.css'

const MyDevprojectsPage = () => {
  const typingIntervalRef = useRef(null)
  const [projects, setProjects] = useState([
    {
      title: '',
      tech: '',
      description: '',
      notes: '',
      isPublic: true,
      isOpen: false,
      aiResponse: '',
      typedResponse: '',
    },
  ])

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('devvault-projects'))
  if (saved?.length) setProjects(saved)
}, [])

useEffect(() => {
  localStorage.setItem('devvault-projects', JSON.stringify(projects))
}, [projects])

  useEffect(() => {
  setProjects((prev) =>
    prev.filter((proj, index, arr) => {
      const isLast = index === arr.length - 1
      const hasContent = proj.title || proj.tech || proj.description || proj.notes
      const shouldKeep = hasContent || proj.isOpen || isLast
      return shouldKeep
    })
  )
}, [projects])

  useEffect(() => {
    const lastProject = projects[projects.length - 1]
    const hasInput = lastProject.tech || lastProject.description || lastProject.notes
    const noTitle = !lastProject.title.trim()
    const closed = !lastProject.isOpen

    if (hasInput && closed && noTitle) return
    if ((lastProject.title || hasInput) && closed) {
      setProjects((prev) => [
        ...prev,
        {
          title: '',
          tech: '',
          description: '',
          notes: '',
          isPublic: true,
          isOpen: false,
          aiResponse: '',
          typedResponse: '',
        },
      ])
    }
  }, [projects])

  const toggleProject = (index) => {
    setProjects((prev) =>
      prev.map((proj, i) => i === index ? { ...proj, isOpen: true } : proj)
    )
  }

  const closeProject = (index) => {
    setProjects((prev) =>
      prev.map((proj, i) => i === index ? { ...proj, isOpen: false } : proj)
    )
  }

  const updateProjectField = (index, field, value) => {
    setProjects((prev) =>
      prev.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      )
    )
  }

  const requestAI = async (index) => {
    const project = projects[index]
    const prompt = `Project Title: ${project.title}\nTech Stack: ${project.tech}\nDescription: ${project.description}\nNotes: ${project.notes}\nThis project is ${project.isPublic ? 'public' : 'private'}.\n\nBased on this, provide feedback, suggestions, or possible directions for development.`

    const res = await fetch('/.redwood/functions/askAi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()
    const output = data.output || ''

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)

    let i = 0
    typingIntervalRef.current = setInterval(() => {
      setProjects((prev) =>
        prev.map((proj, idx) => {
          if (idx === index) {
            if (i < output.length) {
              i++
              return {
                ...proj,
                typedResponse: output.slice(0, i),
              }
            } else {
              clearInterval(typingIntervalRef.current)
              return { ...proj }
            }
          }
          return proj
        })
      )
    }, 15)

    setProjects((prev) =>
      prev.map((proj, idx) =>
        idx === index ? { ...proj, aiResponse: output, typedResponse: '' } : proj
      )
    )
  }

  return (
    <>
      <Metadata title="My Projects" description="MyDevprojects page" />

      <div className={styles['box-row']} style={{ flexDirection: 'column' }}>
        {projects.map((project, index) => (
          <div key={index} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div
              onClick={!project.isOpen ? () => toggleProject(index) : undefined}
              className={`${styles['project-box']} ${project.isOpen ? styles.expanded : ''}`}
            >
              {project.isOpen ? (
                <div onClick={(e) => e.stopPropagation()} className={`${styles['fade-in']} ${styles['input-wrapper']}`}>
                  <button onClick={() => closeProject(index)} className={styles['back-button']}>
                    {'<'}
                  </button>
                  <input
                    type='text'
                    value={project.title}
                    onChange={(e) => updateProjectField(index, 'title', e.target.value)}
                    placeholder='Project Title'
                    className={styles['project-input']}
                  />
                  {project.title.trim() === '' && (project.tech.trim() || project.description.trim() || project.notes.trim()) && (
                    <p className={styles['title-warning']}>Please enter a project title.</p>
                  )}
                  <input
                    type='text'
                    value={project.tech}
                    onChange={(e) => updateProjectField(index, 'tech', e.target.value)}
                    placeholder='Tech Used (e.g. React, Node)'
                    className={styles['project-input']}
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProjectField(index, 'description', e.target.value)}
                    placeholder='Project Description'
                    className={styles['project-textarea']}
                  />
                  <textarea
                    value={project.notes}
                    onChange={(e) => updateProjectField(index, 'notes', e.target.value)}
                    placeholder='Notes'
                    className={styles['project-textarea']}
                  />
                  <div className={styles['toggle-container']}>
                    <span>{project.isPublic ? 'Public' : 'Private'}</span>
                    <label className={styles['toggle-switch']}>
                      <input
                        type='checkbox'
                        checked={project.isPublic}
                        onChange={(e) => updateProjectField(index, 'isPublic', e.target.checked)}
                      />
                      <span className={styles['slider']}></span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className={styles['project-title-closed']}>
                  {project.title || 'Untitled Project'}
                </div>
              )}
            </div>

            <div className={styles['ai-box']}>
              {project.aiResponse ? (
                <>
                  <p className={styles['typing-cursor']}>{project.typedResponse}</p>
                </>
              ) : (
                <>
                  <p className={styles['placeholder']}>The AI response will appear here.</p>
                </>
              )}
              <button className={styles['genBtn']} onClick={() => requestAI(index)} disabled={!project.title.trim()}>
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyDevprojectsPage