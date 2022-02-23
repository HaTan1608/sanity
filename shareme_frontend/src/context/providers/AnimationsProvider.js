import { useEffect, useState } from "react";
import AnimationsContext from "../AnimationsContext";
import { postSearchSelectors } from "../../store/selectors/postSelector";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";
const AnimationsProvider = ({ children, postSearchSelectors }) => {
  const { load } = postSearchSelectors || true;
  const scrollAnimations = () => {
    const animation = (elements, className) => {
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const viewPortHeight = window.innerHeight - 150;

        if (elementPosition < viewPortHeight) {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      });
    };
    const elements = document.querySelectorAll(".animation");
    const headingElements = document.querySelectorAll(".headingAnimation");
    animation(elements, "animate");
    animation(headingElements, "headingAnimate");
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollAnimations);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", scrollAnimations);
  }, []);
 
  useEffect(() => {
    if (!load) {
      const timerId = setInterval(() => {
        scrollAnimations();
        if (true) {
          clearInterval(timerId);
        }
      }, 500);
    }
  }, [load]);
  
  return (
    <AnimationsContext.Provider value>{children}</AnimationsContext.Provider>
  );
};
function mapStateToProps(state) {
  return {
    postSearchSelectors: postSearchSelectors(state),
  };
}
export default connect(mapStateToProps)(AnimationsProvider);
