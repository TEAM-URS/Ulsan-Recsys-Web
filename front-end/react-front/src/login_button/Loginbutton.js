import React, { useRef } from "react";
import "./styles.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */
const DropdownLogin = () => {
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, buttonRef, false);

    const onClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="container">
        <div className="menu-container">
            <button ref={buttonRef} onClick={onClick} className="menu-trigger">
            <img
                src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            />
            </button>
            <nav
            className={`menu ${isActive ? "active" : "inactive"}`}
            ref={dropdownRef}
            >
            <ul>
                <li>
                <a href="http://localhost:8000/logout" id="logout">Logout</a>
                </li>
            </ul>
            </nav>
        </div>
        </div>
    )
}

export default DropdownLogin;