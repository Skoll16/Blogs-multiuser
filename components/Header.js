import { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import { signout, isAuth } from "../actions/auth";
import NProgress from "nprogress";
import Search from "../components/blog/Search";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import Router from "next/router";
import ".././node_modules/nprogress/nprogress.css";
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand href="/">
        <p style={{ color: "white" }}>
          {APP_NAME}</p>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <>
            
            <NavItem style={{ color: "white" }}>
              <NavLink>
                <Link  href="/"><a style={{ color: "white" , textDecoration:"none"}}>Home</a></Link>
              </NavLink>
            </NavItem>
              <NavItem style={{ color: "white" }}>
                <Link href="/blogs">
                  <NavLink  style={{ cursor: "pointer" }}>
                  <a style={{ color: "white", textDecoration:"none" }}>Blogs</a></NavLink>
                </Link>
              </NavItem>
            </>

            {!isAuth() && (
              <>
                <NavItem style={{ color: "white" }}>
                  <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}><p style={{ color: "white" }}>
                    Sign In</p></NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: "pointer" }}> <a style={{ color: "white", textDecoration:"none" }}>Sign Up</a></NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <NavLink style={{ color: "white" }}>
                  <Link href="/user">
                  <a style={{ color: "white" , textDecoration:"none"}}> {`${isAuth().name}'s Dashboard`}</a>

                  {/* {`${isAuth().name}'s Dashboard`} */}
                  </Link>
                </NavLink>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem style={{ color: "white" }}>
                <NavLink>
                  <Link href="/admin">
                  <a style={{ color: "white" , textDecoration:"none"}}> {`${isAuth().name}'s Dashboard`}</a>
                 </Link>
                </NavLink>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem style={{ color: "white" }}>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => Router.replace("/signin"))}
                >
                  <a style={{ color: "white", textDecoration:"none" }}>Sign Out</a>
                </NavLink>
              </NavItem>
            )}
            {/* <NavItem>
              <a
                className="btn "
                style={{ color: "white" }}
                href="/user/crud/blog"
              >
                Create Blog
              </a>
            </NavItem> */}
            <NavItem style={{ color: "white" }}>
              <NavLink>
                <Link  href="/contact"><a style={{ color: "white" , textDecoration:"none"}}>Contact</a></Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </div>
  );
};

export default Header;
