

const Navbar = (setCategory) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="#">News</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        {/* <div className="nav-link" onClick={()=>setCategory("technology")}>Technology</div>
        <div className="nav-link" onClick={()=>setCategory("Business")}>Business</div>
        <div className="nav-link"onClick={()=>setCategory("Health")} >Health</div>
        <div className="nav-link" onClick={()=>setCategory("Sports")}>Sports</div>
        <div className="nav-link" onClick={()=>setCategory("Entertainment")}>Entertainment</div> */}
       
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar