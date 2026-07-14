/** Editorial Discipline: concise public routing with a small initial bundle and secondary pages loaded only when requested. */
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import Seo from "@/components/Seo";

const About = lazy(() => import("@/pages/About"));
const PrivateCoaching = lazy(() => import("@/pages/PrivateCoaching"));
const Corporate = lazy(() => import("@/pages/Corporate"));
const Kids = lazy(() => import("@/pages/Kids"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function Router() {
  return (
    <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/private-coaching" component={PrivateCoaching} />
        <Route path="/corporate" component={Corporate} />
        <Route path="/kids" component={Kids} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Seo />
      <Router />
    </ErrorBoundary>
  );
}
