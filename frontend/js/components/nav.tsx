
const NavBar = () => {

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>eLabFTW</a></li>
            <li>
              <a>Orders</a>
              <ul className="p-2">
                <li><a>Chemicals</a></li>
                <li><a>Supplies</a></li>
              </ul>
            </li>
            <li><a>Docs</a></li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost normal-case text-xl">MTEKHub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/elabftw">eLabFTW</a></li>
          <li tabIndex={0}>
            <details>
              <summary>Orders</summary>
              <ul className="p-2">
                <li><a href="/chemicalorder">Chemicals</a></li>
                <li><a href="/suppliesorder">Supplies</a></li>
              </ul>
            </details>
          </li>
          <li><a>Docs</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </div>
  )
}

export default NavBar;
