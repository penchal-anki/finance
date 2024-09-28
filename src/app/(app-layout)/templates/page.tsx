import PageHeader from "@/app/shared/page-header";
import TemplatesView from "@/app/shared/templates/template-view"; // Import the TemplatesView component

const pageHeader = {
  title: "Interview Templates",
  subHeading:
    "Keep your interview questions and code snippets in Templates. You can start a new interview from your templates or import them into an existing interview. Templates are shared between your team.",
  breadcrumb: [],
};

const TemplatesPage = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        subHeading={pageHeader.subHeading}
      ></PageHeader>

      <TemplatesView />
    </>
  );
};

export default TemplatesPage;
