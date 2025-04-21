import SingleResult from "@/components/teams/results/single-result";

type RProps = {
  params: Promise<{ fixId: string }>;
};

const SingleResultPage = async ({ params }: RProps) => {
  const { fixId } = await params;

  return <SingleResult fixId={fixId} />;
};

export default SingleResultPage;
