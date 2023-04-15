import React from 'react'

function ThemeSwitch({ theme, setTheme }) {

  React.useState('black')

  return <div style={{
    position: 'absolute',
    borderRight: `25px solid ${theme ? 'black' : 'white'}`,
    borderBottom: `25px solid ${theme ? 'black' : 'white'}`,
    borderTop: `25px solid ${!theme ? 'black' : 'white'}`,
    borderLeft: `25px solid ${!theme ? 'black' : 'white'}`,
    borderRadius: '50%',
    transform: `rotate(-45deg)`,
    display: `inline-block`,
    transition: '.5s all '
  }}
    onClick={() => setTheme(prev => !prev)}
  >

  </div>
}

export default ThemeSwitch