import "./nav.css"
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../store/UsersSlice"
import IMG from "../../../assets/images-removebg-preview.png"
function Nav() {
  const PB = "https://blog-back-end-express.vercel.app/images/"

  const { users } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    // window.location.replace("/login")
  }
  return (
    <nav className="navbar navbar-expand-md position-sticky top-0  " style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container">
        <Link className="navbar-brand w-25 m-0" to="/">
          <img src={IMG} alt="" style={{width:"50px"}} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse w-50 align-items-center justify-content-center  ms-5" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={{whiteSpace:"nowrap"}} to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{whiteSpace:"nowrap"}} to="/">اتصل بنا</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{whiteSpace:"nowrap"}} to="/write">{users && "اضافة مقال"}</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" onClick={handleLogout} className="nav-link" style={{whiteSpace:"nowrap"}} >{users && "تسجيل خروج"}</Link>
            </li>
          </ul>
        </div>
        {users ? <div className="profile d-flex align-items-center justify-content-end w-25">
          <Link to={`/update/${users._id}`}><img src={PB + users.profilePic} alt="" className="rounded-circle ms-3" style={{ width: "50px", height: "50px" }} /></Link>
          <FaSearch />
        </div> : <ul className="d-flex gap-4 m-0">
          <li>
            <Link className=" fs-6 text-black " to="/login" style={{ whiteSpace: "nowrap" }}>تسجيل دخول</Link>
          </li>
          <li>
            <Link className="fs-6 text-black " to="/register" style={{ whiteSpace: "nowrap" }}>انشاء حساب</Link>
          </li>
        </ul>}
      </div>
    </nav>
  )
}

export default Nav