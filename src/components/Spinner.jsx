const Spinner = ({ size = 16, color = 'white' }) => {
  return (
    <span
      style={{ width: size, height: size, borderColor: `${color}4D`, borderTopColor: color }}
      className="inline-block border-2 rounded-full animate-spin"
    />
  )
}

export default Spinner;