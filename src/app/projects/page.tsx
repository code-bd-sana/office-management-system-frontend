import { MainLayout } from "@/components/layout";
import ProjectContent from "@/components/project/ProjectContent";
import React from "react";

const ProjectPage = () => {
  return (
    <MainLayout pageTitle="Projects">
      <ProjectContent />
    </MainLayout>
  );
};

export default ProjectPage;
