import AboutExperiment from "../components/Experiment/About";
import Comments from "../containers/Comments";
import { comments } from "../mockData";

export default function HomePage() {
  return (
    <>
      <AboutExperiment />
      <Comments comments={comments} />
    </>
  );
}
