import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar sticky-top bg-success">
      <a className="navbar-brand">
        <h1 id="navHead">FooBar</h1>
      </a>
      <div className="d-flex align-items-center">
        <form className="d-flex align-items-center" id="navForm">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search FooBar"
            aria-label="Search"
          ></input>
        </form>
        <button className="btn btn-outline-light">Search</button>
      </div>
    </nav>
  );
}
export default Navbar;
