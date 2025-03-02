import HomePage from "./components/HomePage";
import About from "./components/About";
import Projects from "./components/Projects";
import MyArticles from "./components/MyArticles";
import Contact from "./components/Contact";

export function getRoutes() {
  return [
    { titleKey: "home", url: "/", component: <HomePage /> },
    { titleKey: "about", url: "/about", component: <About /> },
    { titleKey: "projects", url: "/projects", component: <Projects /> },
    { titleKey: "articles", url: "/articles", component: <MyArticles /> },
    { titleKey: "contact", url: "/contact", component: <Contact /> }
  ];
}

export function getPage(url) {
  const routes = getRoutes();
  return routes.findLast(x => url.startsWith(x.url)) ?? routes[0];
}