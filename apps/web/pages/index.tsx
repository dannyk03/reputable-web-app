import Comments from "../containers/Comments";
import CommunitiesListView from "../containers/Communities/List";
import { communities } from "../mockData";

export default function HomePage() {
  return (
    <>
      <CommunitiesListView data={communities} />
    </>
  );
}
