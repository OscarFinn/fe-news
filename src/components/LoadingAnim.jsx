import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

export default function LoadingAnim() {
  return (
    <section className="loading-container">
      <div className="loading">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </section>
  );
}
