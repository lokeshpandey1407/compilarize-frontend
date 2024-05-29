import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h3>Compilarize</h3>{" "}
      <p style={{ fontSize: "10px" }}>Your online JavaScript solutions</p>
    </div>
  );
};

export default Navbar;
