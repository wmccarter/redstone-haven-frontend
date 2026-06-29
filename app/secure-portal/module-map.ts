export type MissionModule = {
  id: string;
  title: string;
  category: 'module' | 'action' | 'access';
  summary: string;
  status: 'planned' | 'in-progress' | 'ready';
};

export const MISSION_MODULES: MissionModule[] = [
  {
    id: 'auth-intro',
    title: 'Faux Auth Intro',
    category: 'module',
    summary: 'Entry animation, scanline sync, and mission token staging.',
    status: 'in-progress',
  },
  {
    id: 'telemetry-stack',
    title: 'Telemetry Stack',
    category: 'module',
    summary: 'Primary stack bootstrap and step-one gate control.',
    status: 'in-progress',
  },
  {
    id: 'system-telemetry',
    title: 'System Telemetry',
    category: 'module',
    summary: 'Live operational status rows and mission readout surface.',
    status: 'in-progress',
  },
  {
    id: 'channel-readiness',
    title: 'Channel Readiness',
    category: 'module',
    summary: 'Preflight checks for payload and channel viability.',
    status: 'in-progress',
  },
  {
    id: 'protected-access',
    title: 'Protected Access',
    category: 'module',
    summary: 'Locked module gate that reveals protected content zones.',
    status: 'in-progress',
  },
  {
    id: 'data-payload',
    title: 'Data Payload Module',
    category: 'module',
    summary: 'File staging, validation rules, and upload mission pipeline.',
    status: 'in-progress',
  },
  {
    id: 'uplink-sequence',
    title: 'Uplink Sequence',
    category: 'action',
    summary: 'Packetize, encrypt, verify, and complete transmission flow.',
    status: 'in-progress',
  },
  {
    id: 'mission-archives',
    title: 'Mission Archives',
    category: 'access',
    summary: 'Archive mini-page and timeline/search views for operations.',
    status: 'planned',
  },
  {
    id: 'private-downloads',
    title: 'Private Downloads',
    category: 'access',
    summary: 'Guarded download center and package management views.',
    status: 'planned',
  },
  {
    id: 'partner-access',
    title: 'Partner Access',
    category: 'access',
    summary: 'External collaborator lanes with scoped relay permissions.',
    status: 'planned',
  },
  {
    id: 'early-access',
    title: 'Early Access',
    category: 'access',
    summary: 'Controlled preview bay for upcoming and experimental content.',
    status: 'planned',
  },
];

export const missionModuleById = Object.fromEntries(MISSION_MODULES.map((module) => [module.id, module])) as Record<string, MissionModule>;

export function missionModuleHref(id: string) {
  return `/secure-portal/modules/${id}`;
}
