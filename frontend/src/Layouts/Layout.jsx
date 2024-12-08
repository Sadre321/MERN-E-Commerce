import { isAdmin } from '../config/isAdmin.js';
import AdminLayouts from './AdminLayouts.jsx';
import MainLayouts from './MainLayouts.jsx';

export const Layout = isAdmin? <AdminLayouts/>:<MainLayouts/>;