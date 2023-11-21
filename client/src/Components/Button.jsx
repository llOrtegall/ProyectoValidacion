export function Button ({ onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-500 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white`}
    >
      {children}
    </button>
  )
}
