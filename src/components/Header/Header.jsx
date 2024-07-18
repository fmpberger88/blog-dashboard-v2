import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Delete JWT Token
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <header className={`${styles.headerContainer} ${isModalOpen ? styles.modalOpen : ''}`}>
                <nav>
                    <ul className={styles.navList}>
                        <div className={styles.navGroup}>
                            <li>
                                <NavLink to="/blogs">Blogs</NavLink>
                            </li>
                        </div>
                        <div className={styles.navGroup}>
                            {!token ? (
                                <>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register">Register</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/create-blog">Create Blog</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/user/blogs">My Blogs</NavLink>
                                    </li>
                                    <li>
                                        <NavLink as="button" to="#" onClick={handleLogout}>Logout</NavLink>
                                    </li>
                                </>
                            )}
                        </div>
                    </ul>
                </nav>
            </header>
            <button className={styles.navButton} onClick={toggleModal}>+</button>
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={toggleModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={toggleModal}>×</button>
                        <nav>
                            <ul className={styles.navList}>
                                <div className={styles.navGroup}>
                                    <li>
                                        <NavLink to="/blogs" onClick={toggleModal}>Blogs</NavLink>
                                    </li>
                                </div>
                                <div className={styles.navGroup}>
                                    {!token ? (
                                        <>
                                            <li>
                                                <NavLink to="/login" onClick={toggleModal}>Login</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/register" onClick={toggleModal}>Register</NavLink>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <NavLink to="/create-blog" onClick={toggleModal}>Create Blog</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/user/blogs" onClick={toggleModal}>My Blogs</NavLink>
                                            </li>
                                            <li>
                                                <NavLink as="button" to="#" onClick={() => { handleLogout(); toggleModal(); }}>Logout</NavLink>
                                            </li>
                                        </>
                                    )}
                                </div>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
