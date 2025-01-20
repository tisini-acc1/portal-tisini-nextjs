import ImageUploadForm from "@/components/teams/manage-player/image-upload-form";

type UploadProps = {
  params: Promise<{ playerId: string }>;
};

const EditPlayerPage = async ({ params }: UploadProps) => {
  const { playerId } = await params;

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ImageUploadForm playerId={playerId} />

      <section>upload ID or Birth</section>
    </main>
  );
};

export default EditPlayerPage;
