// Layout.jsx
import { isAdmin } from '../config/isAdmin.js';  // isAdmin değeri
import AdminLayouts from './AdminLayouts.jsx';   // AdminLayouts bileşeni
import MainLayouts from './MainLayouts.jsx';     // MainLayouts bileşeni
import PropTypes from "prop-types";

// Layout bileşeni, isAdmin'e göre uygun layout'u render eder
export const Layout = ({ children }) => {
  if (isAdmin) {
    return <AdminLayouts>{children}</AdminLayouts>; // Admin layout'u kullan
  }
  return <MainLayouts>{children}</MainLayouts>;     // Ana layout'u kullan
};

Layout.propTypes = {
    children:PropTypes.node
}