import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav style={{background: 'red'}}>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
        <Link to="/items">Items</Link>
        </li>
      </ul>
    </nav>
  )
}