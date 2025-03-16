import FixtureDataMenu from "./fixture-data-menu";

const FixtureData = () => {
  return (
    <section className="h-96 w-full space-y-6 bg-gray-100 p-3 rounded-md relative">
      Match Data
      <div className="absolute bottom-0 right-0">
        <FixtureDataMenu />
      </div>
    </section>
  );
};

export default FixtureData;
