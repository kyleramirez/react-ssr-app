
import { hydrateRoot } from "react-dom/client";
import Application from "./containers/Application";

const root = document.getElementById('react-root');
const props = JSON.parse(root.dataset.reactProps);
hydrateRoot(root, <Application {...props} />);
