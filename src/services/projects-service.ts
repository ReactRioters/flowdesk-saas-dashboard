export type ProjectStatus = "Active" | "Completed" | "On Hold";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  membersCount: number;
  progress: number;
  dueDate: string;
};

let projectsData: Project[] = [
  {
    id: "proj_1",
    name: "FlowDesk UI Kit",
    description: "Design and implement the reusable Tailwind CSS component library.",
    status: "Active",
    membersCount: 4,
    progress: 75,
    dueDate: "2026-06-15",
  },
  {
    id: "proj_2",
    name: "API Gateway Integration",
    description: "Connect frontend dashboard components to the core backend gateway services.",
    status: "Active",
    membersCount: 3,
    progress: 45,
    dueDate: "2026-07-01",
  },
  {
    id: "proj_3",
    name: "Multi-tenant Billing",
    description: "Launch subscription structures, plan upgrades, and invoice generation flows.",
    status: "On Hold",
    membersCount: 2,
    progress: 90,
    dueDate: "2026-05-30",
  },
  {
    id: "proj_4",
    name: "Customer Onboarding Walkthrough",
    description: "Create interactive user guides and onboarding tours for new platform signups.",
    status: "Completed",
    membersCount: 5,
    progress: 100,
    dueDate: "2026-04-10",
  },
];

export async function getProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [...projectsData];
}

export async function createProject(project: Omit<Project, "id">): Promise<Project> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newProject: Project = {
    ...project,
    id: `proj_${Math.random().toString(36).substr(2, 9)}`,
  };
  projectsData = [newProject, ...projectsData];
  return newProject;
}

export async function updateProject(project: Project): Promise<Project> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  projectsData = projectsData.map((p) => (p.id === project.id ? project : p));
  return project;
}

export async function deleteProject(projectId: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  projectsData = projectsData.filter((p) => p.id !== projectId);
  return projectId;
}
