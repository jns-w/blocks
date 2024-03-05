import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Modal, Tooltips} from "@components";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {currentProjectAtom, newProjectModalAtom, projectsAtom, userActionTimestampAtom, userAtom} from "@atoms";
import {useAtom} from "jotai";
import {authedReq, inputObjHandler} from "@utils";
import {Input} from "../TimerModals";
import {v4 as uuid} from "uuid";
import {Project} from "@types";

export const ProjectsButton = () => {
  const [projTooltips, setProjTooltips] = useState(false)
  const [projects, setProjects] = useAtom(projectsAtom)
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom)
  const [userActionTimestamp, setUserActionTimestamp] = useAtom(userActionTimestampAtom)
  const [newProjectModal, setNewProjectModal] = useAtom(newProjectModalAtom)
  const [user,] = useAtom(userAtom)

  const [projectsInputs, setProjectsInputs] = useState({newProjectName: ""})

  const setProject = (id: string) => {
    const i = projects.findIndex(el => el.id === id)
    setCurrentProject(projects[i]);
    setProjTooltips(false);
    setUserActionTimestamp(Date.now())
  }

  const addProject = async () => {
    if (!projectsInputs.newProjectName) return;
    const project: Project = {
      id: uuid(),
      name: projectsInputs.newProjectName
    }
    // talk to server if user is logged in
    if (user._id) {
      const res: Awaited<{
        success: boolean,
        data: { projects: Project[], projectAdded: Project }
      }> = await authedReq.post("/api/blocks/projects/new", {
        project
      })
      if (res.success) {
        setProjects(res.data.projects)
        setCurrentProject(res.data.projectAdded)
      }
    } else { // offline mode
      setProjects(prev => [...prev, project])
      setCurrentProject(project)
    }
  };

  const getProjects = async () => {
    const res: Awaited<{
      success: boolean,
      data: { projects: Project[] }
    }> = await authedReq.get("/api/blocks/projects")
    if (res.success) {
      setProjects(res.data.projects)
    }
  }

  useEffect(() => {
    if (user._id) {
      getProjects()
    }
  }, [])

  return (
    <Wrapper>
      <Container
        onClick={() => {
          !projTooltips && setProjTooltips(true);
        }}
      >
        <div style={{marginRight: "3px"}}>
          Proj: {currentProject?.name !== undefined ? currentProject.name + " " : ""}
        </div>
        <FontAwesomeIcon icon={faAngleDown}/>


        {projTooltips && (
          <Tooltips setMount={setProjTooltips}>
            {projects &&
              projects.map((proj) => {
                return (
                  <div
                    onClick={() => setProject(proj.id)}
                  >
                    {proj.name}
                  </div>
                );
              })}
            <div
              style={{display: "flex", gap: "5px"}}
              onClick={() => {
                setNewProjectModal(true);
                setProjTooltips(false);
              }}
            >
              <FontAwesomeIcon icon={faPlus}/>
              <text>New project</text>
            </div>
          </Tooltips>
        )}
      </Container>

      {newProjectModal && (
        <Modal
          header={"New project"}
          setMount={setNewProjectModal}
          buttonContent={{text: "Add", fn: addProject, isActive: true}}
        >
          <Input
            name={"newProjectName"}
            value={projectsInputs.newProjectName}
            onChange={(e) => inputObjHandler(e, setProjectsInputs, projectsInputs)}
          />
        </Modal>
      )}
    </Wrapper>

  )
}

const Wrapper = styled.div``

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 20px;
  margin-right: 20px;
  transition: background-color 100ms ease 0s, box-shadow 100ms ease 0s;
  background-color: ${({theme}) => theme.color.cardsBg};
  color: ${({theme}) => theme.color.mildTextColor};

  box-shadow: ${({theme}) => theme.color.boxShadow} 1px 1px 5px;

  &:hover {
    background-color: ${({theme}) => theme.color.cardsHover};
  }
`