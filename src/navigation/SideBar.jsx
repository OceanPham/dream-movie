import React from 'react';
import { Mail, MessageSquare, FileText, Circle } from 'react-feather';
import { NavLink } from 'react-router-dom';
import './style.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {/* Dashboard Link */}
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        <Mail size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                {/* ExportTicket Link */}
                <li>
                    <NavLink to="/exportTicket" activeClassName="active">
                        <MessageSquare size={20} />
                        <span>ExportTicket</span>
                    </NavLink>
                </li>

                {/* Manager (Dropdown) */}
                <li className="has-submenu">
                    <span>
                        <FileText size={20} />
                        <span>Manager</span>
                    </span>
                    <ul className="submenu">
                        <li>
                            <NavLink to="/apps/invoice/list" activeClassName="active">
                                <Circle size={12} />
                                <span>Employee</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/apps/invoice/preview" activeClassName="active">
                                <Circle size={12} />
                                <span>Movie</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
