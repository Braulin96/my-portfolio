import { useState } from "react";
import { motion } from "framer-motion";

import TechList from "components/TechList/TechList";
import Paragraph from "components/Paragraph/Paragraph";
import Modal from "components/Modal/Modal";
import Carousel from "components/Carousel/Carousel";

import "./ProjectCard.styles.scss";

type ProjectCardProps = {
  project: {
    title: string;
    description: string;
    technologies: string[];
    gradient: string;
    mainImage?: string;
    moreImages?: string[];
  };
  projectIndex?: number;
  totalProjects?: number;
};

const ProjectCard = ({
  project,
  projectIndex,
  totalProjects,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePlusClick();
    }
  };

  const projectPositionLabel =
    projectIndex && totalProjects
      ? `Project ${projectIndex} of ${totalProjects}`
      : "";

  return (
    <article
      role="gridcell"
      aria-label={`${project.title} project card ${projectPositionLabel}`}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid="ProjectCard"
        className="ProjectCard relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/30 border border-indigo-500/20 group focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900">
        <div
          className={`h-48 bg-gradient-to-r bg-black flex items-center justify-center`}
          role="img"
          aria-label={`${project.title} project preview image`}>
          {project.mainImage && (
            <img
              src={project.mainImage}
              alt={`Screenshot of ${project.title} project showing the main interface`}
              className="w-full h-full object-cover object-center rounded-t-2xl opacity-80 group-hover:opacity-90 transition-opacity duration-300"
            />
          )}
        </div>

        <div className="p-6">
          <header className="flex justify-between items-start mb-4">
            <Paragraph
              text={project.title}
              customClass="!text-white !text-[20px] font-bold"
              ariaLabel={`Project title: ${project.title}`}
            />
          </header>

          <Paragraph
            text={project.description}
            customClass="!text-[16px] !text-gray-400 mb-4"
            ariaLabel={`Project description: ${project.description}`}
          />

          <div
            className="mb-6"
            role="group"
            aria-label="Technologies used in this project">
            <TechList
              techList={project.technologies}
              ariaLabel={`Technologies: ${project.technologies.join(", ")}`}
            />
          </div>

          {isHovered && (
            <motion.button
              initial={{ y: "70%", opacity: 0 }}
              animate={{
                y: isHovered ? "0%" : "70%",
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={handlePlusClick}
              onKeyDown={handleKeyDown}
              className="text-slate-300 absolute bottom-[12px] right-[12px] size-[44px] text-2xl rounded-full bg-primary-blue/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label={`View more images of ${project.title} project`}
              tabIndex={0}>
              +
            </motion.button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ariaLabel={`${project.title} project image gallery`}>
        <Carousel
          slides={project.moreImages?.map((image) => ({ url: image })) || []}
          customClasses="w-full h-[400px]"
          displayArrows={true}
          currentSlide={0}
          title={project.title}
          ariaLabel={`Image carousel for ${project.title} project`}
        />
      </Modal>
    </article>
  );
};

export default ProjectCard;
