const DevVaultInfoPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>DevVault 2.0</h1>

      <section style={styles.section}>
        <h2 style={styles.heading}>What is DevVault 2.0?</h2>
        <p style={styles.paragraph}>
          DevVault 2.0 is a full-stack project management and idea incubation tool designed to
          showcase my ability to build complex, interactive web applications using modern
          technologies like RedwoodJS, React, and Prisma. It allows users to create, store, and
          manage their development projects seamlessly, enhanced by AI-powered features.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>What Does It Show About Me?</h2>
        <ul style={styles.list}>
          <li>Proficiency in RedwoodJS full-stack framework & Prisma ORM</li>
          <li>Building user authentication & scoped authorization systems</li>
          <li>Implementing custom React contexts and state management</li>
          <li>Integrating AI-generated content with real-time UI updates</li>
          <li>Responsive design and user-friendly interfaces</li>
          <li>Handling local storage and client-server data sync</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>How to Use DevVault 2.0</h2>
        <ol style={styles.list}>
          <li>Log in with your user account. Admins can create new users in the Admin Panel.</li>
          <li>Access the My Projects page to create, view, and manage your dev projects.</li>
          <li>Use the AI assistant to generate ideas, project descriptions, or code snippets.</li>
          <li>Save your progress; your data is securely stored locally or in the backend.</li>
          <li>Find live displayed projects from other users of the website on the dashboard.</li>
        </ol>
      </section>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '720px',
    margin: '3rem auto',
    padding: '0 1.5rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#00ffaa',
  },
  section: {
    color: '#d3d3d3',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #00ffaa',
    paddingBottom: '0.5rem',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  list: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginLeft: '1.25rem',
  },
}

export default DevVaultInfoPage
