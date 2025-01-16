import ImageUploadForm from "@/components/teams/manage-player/image-upload-form";

const EditPlayerPage = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ImageUploadForm />

      <section>upload ID or Birth</section>
    </main>
  );
};

export default EditPlayerPage;
